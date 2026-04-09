import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from './firebase';
import { Integration, ModuleType } from '../types';
import { automationEngine } from './automation-engine';

export const integrationService = {
  async getIntegrations() {
    const q = query(collection(db, 'integrations'), orderBy('priority', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Integration));
  },

  async createIntegration(data: Partial<Integration>) {
    const docRef = await addDoc(collection(db, 'integrations'), {
      ...data,
      isActive: data.isActive ?? true,
      priority: data.priority ?? 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  },

  async updateIntegration(id: string, data: Partial<Integration>) {
    const docRef = doc(db, 'integrations', id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  },

  async deleteIntegration(id: string) {
    await deleteDoc(doc(db, 'integrations', id));
  },

  // Helper methods to trigger events
  async triggerUserRegistration(userData: { userId: string, email: string, name: string }) {
    await automationEngine.trigger('user.registered', userData, 'users');
  },

  async triggerPaymentCompleted(paymentData: { paymentId: string, userId: string, amount: number, currency: string }) {
    await automationEngine.trigger('payment.completed', paymentData, 'payments');
  },

  async triggerFormSubmission(formData: { formId: string, values: any }) {
    await automationEngine.trigger('form.submitted', formData, 'forms');
  }
};
