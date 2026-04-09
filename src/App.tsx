/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { OverviewDashboard } from './components/OverviewDashboard';
import { CRMDashboard } from './components/CRMDashboard';
import { AccountingDashboard } from './components/AccountingDashboard';
import { IntegrationsDashboard } from './components/IntegrationsDashboard';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<OverviewDashboard />} />
          <Route path="/crm" element={<CRMDashboard />} />
          <Route path="/accounting" element={<AccountingDashboard />} />
          <Route path="/integrations" element={<IntegrationsDashboard />} />
          <Route path="/settings" element={<div className="p-8 text-center text-gray-500">صفحه تنظیمات (به زودی)</div>} />
        </Routes>
      </DashboardLayout>
      <Toaster position="top-right" />
    </>
  );
}
