import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Zap, 
  Plus, 
  Play, 
  Settings2, 
  History, 
  MoreVertical,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const integrations = [
  { 
    id: '1', 
    name: 'User Registration → CRM', 
    description: 'Creates a CRM contact when a new user registers.',
    source: 'Users',
    target: 'CRM',
    isActive: true,
    lastRun: '2m ago',
    status: 'success'
  },
  { 
    id: '2', 
    name: 'Payment Success → Accounting', 
    description: 'Creates an accounting entry for successful payments.',
    source: 'Payments',
    target: 'Accounting',
    isActive: true,
    lastRun: '1h ago',
    status: 'success'
  },
  { 
    id: '3', 
    name: 'Form Submission → CRM Lead', 
    description: 'Creates a CRM lead from form submissions.',
    source: 'Forms',
    target: 'CRM',
    isActive: false,
    lastRun: '1d ago',
    status: 'failed'
  },
  { 
    id: '4', 
    name: 'Ticket Created → Notification', 
    description: 'Notifies support team of new tickets.',
    source: 'Tickets',
    target: 'Notifications',
    isActive: true,
    lastRun: '5m ago',
    status: 'success'
  },
];

export function IntegrationsDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
          <p className="text-gray-500">Automate workflows between your modules.</p>
        </div>
        <Button className="bg-black text-white rounded-lg">
          <Plus className="w-4 h-4 mr-2" />
          Create Integration
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((integration) => (
          <Card key={integration.id} className="border-none shadow-sm hover:shadow-md transition-shadow group">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-100 font-medium">
                    {integration.source}
                  </Badge>
                  <ArrowRight className="w-3 h-3 text-gray-400" />
                  <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-100 font-medium">
                    {integration.target}
                  </Badge>
                </div>
                <Switch checked={integration.isActive} />
              </div>
              <CardTitle className="text-xl font-bold">{integration.name}</CardTitle>
              <CardDescription className="text-gray-500 line-clamp-2">
                {integration.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Clock className="w-3.5 h-3.5" />
                    Last run: {integration.lastRun}
                  </div>
                  <div className={cn(
                    "flex items-center gap-1.5 text-xs font-medium",
                    integration.status === 'success' ? "text-emerald-600" : "text-red-600"
                  )}>
                    {integration.status === 'success' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    {integration.status === 'success' ? 'Healthy' : 'Failing'}
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Play className="w-3.5 h-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <History className="w-3.5 h-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Settings2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold mb-6">Execution Logs</h2>
        <Card className="border-none shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-gray-100">
                <TableHead>Time</TableHead>
                <TableHead>Integration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3, 4, 5].map((i) => (
                <TableRow key={i} className="hover:bg-gray-50 border-gray-100 transition-colors cursor-pointer">
                  <TableCell className="text-sm text-gray-500">2024-03-15 10:45:06</TableCell>
                  <TableCell className="font-medium">User Registration → CRM</TableCell>
                  <TableCell>
                    <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 font-medium">Success</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">125ms</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View Data</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
