import { integrationService } from './src/lib/integration-service';

const defaultIntegrations = [
  {
    name: 'User Registration → CRM',
    slug: 'user-registration-to-crm',
    description: 'Creates a CRM contact when a new user registers.',
    sourceModule: 'users',
    targetModule: 'crm',
    triggerEvent: 'user.registered',
    actions: [{
      type: 'create',
      config: {
        targetModel: 'CRMContact',
        fieldMapping: {
          userId: '{{userId}}',
          firstName: '{{name}}',
          email: '{{email}}',
          source: 'registration',
          status: 'lead',
          stage: 'new'
        }
      }
    }],
    priority: 10,
    isActive: true
  },
  {
    name: 'Payment Success → Accounting',
    slug: 'payment-to-accounting',
    description: 'Creates an accounting entry for successful payments.',
    sourceModule: 'payments',
    targetModule: 'accounting',
    triggerEvent: 'payment.completed',
    actions: [{
      type: 'create',
      config: {
        targetModel: 'AccountingEntry',
        fieldMapping: {
          type: 'receipt',
          description: 'Payment for {{planName}}',
          totalDebit: '{{amount}}',
          totalCredit: '{{amount}}',
          status: 'posted'
        }
      }
    }],
    priority: 5,
    isActive: true
  }
];

async function seed() {
  console.log('Seeding integrations...');
  for (const integration of defaultIntegrations) {
    try {
      await integrationService.createIntegration(integration as any);
      console.log(`Created integration: ${integration.name}`);
    } catch (error) {
      console.error(`Error creating integration ${integration.name}:`, error);
    }
  }
  console.log('Seeding complete.');
}

seed();
