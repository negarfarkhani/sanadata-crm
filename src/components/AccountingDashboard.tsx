import React from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  MoreVertical, 
  Download, 
  TrendingUp, 
  TrendingDown, 
  CreditCard,
  FileText
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
import { cn } from '@/lib/utils';

const transactions = [
  { id: '1', date: '2024-03-15', description: 'Payment for Invoice #123', type: 'income', amount: 1200000, category: 'Sales', status: 'posted' },
  { id: '2', date: '2024-03-14', description: 'Office Rent', type: 'expense', amount: 500000, category: 'Rent', status: 'posted' },
  { id: '3', date: '2024-03-13', description: 'Cloud Services', type: 'expense', amount: 150000, category: 'Software', status: 'posted' },
  { id: '4', date: '2024-03-12', description: 'Consulting Fee', type: 'income', amount: 800000, category: 'Services', status: 'posted' },
  { id: '5', date: '2024-03-11', description: 'Marketing Campaign', type: 'expense', amount: 300000, category: 'Marketing', status: 'draft' },
];

export function AccountingDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Accounting</h1>
          <p className="text-gray-500">Track your finances and financial health.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-lg">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-black text-white rounded-lg">
            <Plus className="w-4 h-4 mr-2" />
            New Entry
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">$12,450,000</div>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-xs text-green-600 font-medium mt-1">+15% from last month</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">$4,230,000</div>
              <TrendingDown className="w-4 h-4 text-red-600" />
            </div>
            <p className="text-xs text-red-600 font-medium mt-1">+8% from last month</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">Net Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8,220,000</div>
            <p className="text-xs text-gray-500 font-medium mt-1">Across 3 accounts</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Search transactions..." 
              className="pl-10 bg-gray-50 border-none focus-visible:ring-black"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-lg">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-gray-100">
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id} className="hover:bg-gray-50 border-gray-100 transition-colors cursor-pointer group">
                <TableCell className="text-sm text-gray-500">
                  {transaction.date}
                </TableCell>
                <TableCell>
                  <div className="font-medium">{transaction.description}</div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-100">
                    {transaction.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn(
                    "font-medium capitalize",
                    transaction.status === 'posted' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-orange-50 text-orange-600 border-orange-100"
                  )}>
                    {transaction.status}
                  </Badge>
                </TableCell>
                <TableCell className={cn(
                  "text-right font-bold",
                  transaction.type === 'income' ? "text-emerald-600" : "text-red-600"
                )}>
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <FileText className="w-4 h-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Entry</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Void Entry</DropdownMenuItem>
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
