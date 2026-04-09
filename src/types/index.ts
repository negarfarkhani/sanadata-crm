export type ModuleType = 'users' | 'forms' | 'payments' | 'tickets' | 'content' | 'crm' | 'accounting' | 'notifications';

export interface Integration {
  id: string;
  name: string;
  slug: string;
  description?: string;
  sourceModule: ModuleType;
  targetModule: ModuleType;
  triggerEvent: string;
  actions: IntegrationAction[];
  fieldMapping?: Record<string, string>;
  conditions?: Record<string, any>;
  isActive: boolean;
  priority: number;
  settings?: string;
  createdAt: any;
  updatedAt: any;
}

export interface IntegrationAction {
  type: 'create' | 'update' | 'delete' | 'notify' | 'api_call' | 'webhook';
  config: {
    targetModel?: string;
    targetId?: string;
    fieldMapping?: Record<string, string>;
    userId?: string;
    type?: string;
    title?: string;
    message?: string;
    priority?: 'low' | 'normal' | 'high';
    url?: string;
    method?: string;
    headers?: Record<string, string>;
    body?: any;
    webhookId?: string;
  };
}

export interface AutomationLog {
  id: string;
  integrationId: string;
  triggerData: any;
  actionData: any;
  status: 'pending' | 'success' | 'failed';
  errorMessage?: string;
  executionTime?: number;
  createdAt: any;
}

export interface CRMContact {
  id: string;
  userId?: string;
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  company?: string;
  jobTitle?: string;
  status: 'lead' | 'prospect' | 'customer' | 'churned';
  stage: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  source?: string;
  createdAt: any;
  updatedAt: any;
}

export interface CRMDeal {
  id: string;
  contactId: string;
  title: string;
  value: number;
  stage: 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';
  probability: number;
  createdAt: any;
  updatedAt: any;
}

export interface CRMActivity {
  id: string;
  contactId: string;
  type: 'call' | 'email' | 'meeting' | 'note' | 'task';
  subject: string;
  duration?: number;
  outcome?: string;
  createdAt: any;
}

export interface AccountingEntry {
  id: string;
  type: 'receipt' | 'payment' | 'journal' | 'transfer';
  description: string;
  totalDebit: number;
  totalCredit: number;
  status: 'draft' | 'posted' | 'void';
  lines: AccountingEntryLine[];
  createdAt: any;
  updatedAt: any;
}

export interface AccountingEntryLine {
  accountId: string;
  accountName: string;
  debit: number;
  credit: number;
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense' | 'transfer' | 'refund';
  amount: number;
  category: string;
  description: string;
  paymentMethod: string;
  transactionDate: any;
  createdAt: any;
}
