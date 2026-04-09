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
import { Button, buttonVariants } from '@/components/ui/button';
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
  { id: '1', date: '۱۴۰۳/۰۱/۲۵', description: 'پرداخت فاکتور شماره ۱۲۳', type: 'income', amount: 1200000, category: 'فروش', status: 'posted' },
  { id: '2', date: '۱۴۰۳/۰۱/۲۴', description: 'اجاره دفتر', type: 'expense', amount: 500000, category: 'اجاره', status: 'posted' },
  { id: '3', date: '۱۴۰۳/۰۱/۲۳', description: 'سرویس‌های ابری', type: 'expense', amount: 150000, category: 'نرم‌افزار', status: 'posted' },
  { id: '4', date: '۱۴۰۳/۰۱/۲۲', description: 'هزینه مشاوره', type: 'income', amount: 800000, category: 'خدمات', status: 'posted' },
  { id: '5', date: '۱۴۰۳/۰۱/۲۱', description: 'کمپین بازاریابی', type: 'expense', amount: 300000, category: 'بازاریابی', status: 'draft' },
];

const statusLabels = {
  posted: 'ثبت شده',
  draft: 'پیش‌نویس',
};

export function AccountingDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">حسابداری</h1>
          <p className="text-gray-500">امور مالی و سلامت اقتصادی خود را ردیابی کنید.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-lg">
            <Download className="w-4 h-4 ml-2" />
            خروجی
          </Button>
          <Button className="bg-black text-white rounded-lg">
            <Plus className="w-4 h-4 ml-2" />
            ثبت سند جدید
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">کل درآمد</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">۱۲,۴۵۰,۰۰۰ تومان</div>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-xs text-green-600 font-medium mt-1">+۱۵٪ نسبت به ماه گذشته</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">کل هزینه‌ها</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">۴,۲۳۰,۰۰۰ تومان</div>
              <TrendingDown className="w-4 h-4 text-red-600" />
            </div>
            <p className="text-xs text-red-600 font-medium mt-1">+۸٪ نسبت به ماه گذشته</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">مانده خالص</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">۸,۲۲۰,۰۰۰ تومان</div>
            <p className="text-xs text-gray-500 font-medium mt-1">در ۳ حساب بانکی</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="جستجوی تراکنش‌ها..." 
              className="pr-10 bg-gray-50 border-none focus-visible:ring-black"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-lg">
              <Filter className="w-4 h-4 ml-2" />
              فیلتر
            </Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-gray-100">
              <TableHead className="text-right">تاریخ</TableHead>
              <TableHead className="text-right">شرح</TableHead>
              <TableHead className="text-right">دسته</TableHead>
              <TableHead className="text-right">وضعیت</TableHead>
              <TableHead className="text-left">مبلغ</TableHead>
              <TableHead className="text-left">عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id} className="hover:bg-gray-50 border-gray-100 transition-colors cursor-pointer group">
                <TableCell className="text-sm text-gray-500">
                  {transaction.date}
                </TableCell>
                <TableCell>
                  <div className="font-medium text-right">{transaction.description}</div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-100">
                    {transaction.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn(
                    "font-medium",
                    transaction.status === 'posted' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-orange-50 text-orange-600 border-orange-100"
                  )}>
                    {statusLabels[transaction.status as keyof typeof statusLabels]}
                  </Badge>
                </TableCell>
                <TableCell className={cn(
                  "text-left font-bold",
                  transaction.type === 'income' ? "text-emerald-600" : "text-red-600"
                )}>
                  {transaction.type === 'income' ? '+' : '-'}{transaction.amount.toLocaleString()}
                </TableCell>
                <TableCell className="text-left">
                  <div className="flex items-center justify-start gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <FileText className="w-4 h-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-8 w-8")}>
                        <MoreVertical className="w-4 h-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem className="text-right">مشاهده جزئیات</DropdownMenuItem>
                        <DropdownMenuItem className="text-right">ویرایش سند</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 text-right">ابطال سند</DropdownMenuItem>
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
