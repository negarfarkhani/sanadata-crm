import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Search, 
  Plus, 
  Filter, 
  MoreVertical, 
  Mail, 
  Phone, 
  Building2,
  UserPlus
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
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const contacts = [
  { id: '1', name: 'Amir Hossein', email: 'amir@example.com', company: 'Sana Tech', status: 'customer', stage: 'won', phone: '+98 912 000 0000' },
  { id: '2', name: 'Sara Ahmadi', email: 'sara@example.com', company: 'Pars Co', status: 'prospect', stage: 'proposal', phone: '+98 912 111 1111' },
  { id: '3', name: 'Reza Moradi', email: 'reza@example.com', company: 'Global Solutions', status: 'lead', stage: 'new', phone: '+98 912 222 2222' },
  { id: '4', name: 'Maryam Zare', email: 'maryam@example.com', company: 'Creative Agency', status: 'customer', stage: 'won', phone: '+98 912 333 3333' },
  { id: '5', name: 'Ali Karimi', email: 'ali@example.com', company: 'Future Systems', status: 'prospect', stage: 'negotiation', phone: '+98 912 444 4444' },
];

const statusColors = {
  customer: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  prospect: 'bg-blue-50 text-blue-600 border-blue-100',
  lead: 'bg-slate-50 text-slate-600 border-slate-100',
  churned: 'bg-red-50 text-red-600 border-red-100',
};

export function CRMDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">CRM</h1>
          <p className="text-gray-500">Manage your contacts and sales pipeline.</p>
        </div>
        <Button className="bg-black text-white rounded-lg">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Contact
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-xs text-green-600 font-medium mt-1">+12% from last month</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5%</div>
            <p className="text-xs text-green-600 font-medium mt-1">+3.2% from last month</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">Pipeline Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$452,000</div>
            <p className="text-xs text-blue-600 font-medium mt-1">8 active deals</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Search contacts..." 
              className="pl-10 bg-gray-50 border-none focus-visible:ring-black"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-lg">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="rounded-lg">
              Export
            </Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-gray-100">
              <TableHead className="w-[250px]">Contact</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact.id} className="hover:bg-gray-50 border-gray-100 transition-colors cursor-pointer group">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                      {contact.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-medium">{contact.name}</div>
                      <div className="text-xs text-gray-500">{contact.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Building2 className="w-3 h-3" />
                    {contact.company}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn("font-medium capitalize", statusColors[contact.status as keyof typeof statusColors])}>
                    {contact.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="text-sm font-medium capitalize text-gray-700">
                    {contact.stage.replace('_', ' ')}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Mail className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Contact</DropdownMenuItem>
                        <DropdownMenuItem>View Activity</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
