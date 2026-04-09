import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  serverTimestamp,
  doc,
  updateDoc,
  getDoc
} from 'firebase/firestore';
import { db } from './firebase';
import { Integration, ModuleType } from '../types';

export class AutomationEngine {
  private static instance: AutomationEngine;

  private constructor() {}

  public static getInstance(): AutomationEngine {
    if (!AutomationEngine.instance) {
      AutomationEngine.instance = new AutomationEngine();
    }
    return AutomationEngine.instance;
  }

  public async trigger(event: string, data: any, sourceModule: ModuleType): Promise<void> {
    console.log(`Triggering event: ${event} from ${sourceModule}`, data);

    const integrationsRef = collection(db, 'integrations');
    const q = query(
      integrationsRef, 
      where('triggerEvent', '==', event),
      where('sourceModule', '==', sourceModule),
      where('isActive', '==', true)
    );

    const querySnapshot = await getDocs(q);
    const integrations = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Integration));

    // Sort by priority
    integrations.sort((a, b) => b.priority - a.priority);

    for (const integration of integrations) {
      await this.executeIntegration(integration, data);
    }
  }

  private async executeIntegration(integration: Integration, triggerData: any): Promise<void> {
    const startTime = Date.now();
    const logRef = collection(db, 'automation_logs');
    
    try {
      // Check conditions
      if (integration.conditions && !this.evaluateConditions(integration.conditions, triggerData)) {
        return;
      }

      const results = [];
      for (const action of integration.actions) {
        const result = await this.executeAction(action, triggerData);
        results.push(result);
      }

      await addDoc(logRef, {
        integrationId: integration.id,
        triggerData,
        actionData: results,
        status: 'success',
        executionTime: Date.now() - startTime,
        createdAt: serverTimestamp()
      });

    } catch (error: any) {
      console.error(`Error executing integration ${integration.name}:`, error);
      await addDoc(logRef, {
        integrationId: integration.id,
        triggerData,
        status: 'failed',
        errorMessage: error.message,
        executionTime: Date.now() - startTime,
        createdAt: serverTimestamp()
      });
    }
  }

  private evaluateConditions(conditions: Record<string, any>, data: any): boolean {
    for (const [key, condition] of Object.entries(conditions)) {
      const value = data[key];
      if (condition.equals !== undefined && value !== condition.equals) return false;
      if (condition.notEquals !== undefined && value === condition.notEquals) return false;
      if (condition.greaterThan !== undefined && value <= condition.greaterThan) return false;
      if (condition.lessThan !== undefined && value >= condition.lessThan) return false;
      if (condition.contains !== undefined && (!value || !value.includes(condition.contains))) return false;
    }
    return true;
  }

  private async executeAction(action: any, triggerData: any): Promise<any> {
    const { type, config } = action;
    const mappedData = this.mapFields(config.fieldMapping || {}, triggerData);

    switch (type) {
      case 'create':
        if (!config.targetModel) throw new Error('Target model not specified');
        const collectionName = this.getCollectionName(config.targetModel);
        const docRef = await addDoc(collection(db, collectionName), {
          ...mappedData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        return { status: 'created', id: docRef.id };

      case 'notify':
        // In a real app, this would send an email/push/SMS
        console.log('Notification sent:', config.title, config.message, mappedData);
        return { status: 'notified' };

      case 'api_call':
        // Proxy through server or direct call if allowed
        return { status: 'api_called' };

      default:
        throw new Error(`Unsupported action type: ${type}`);
    }
  }

  private mapFields(mapping: Record<string, string>, data: any): any {
    const result: any = {};
    for (const [targetKey, sourceTemplate] of Object.entries(mapping)) {
      if (typeof sourceTemplate === 'string' && sourceTemplate.startsWith('{{') && sourceTemplate.endsWith('}}')) {
        const sourceKey = sourceTemplate.slice(2, -2);
        result[targetKey] = data[sourceKey];
      } else {
        result[targetKey] = sourceTemplate;
      }
    }
    return result;
  }

  private getCollectionName(model: string): string {
    switch (model) {
      case 'CRMContact': return 'crm_contacts';
      case 'CRMDeal': return 'crm_deals';
      case 'CRMActivity': return 'crm_activities';
      case 'AccountingEntry': return 'accounting_entries';
      case 'Transaction': return 'transactions';
      default: return model.toLowerCase();
    }
  }
}

export const automationEngine = AutomationEngine.getInstance();
