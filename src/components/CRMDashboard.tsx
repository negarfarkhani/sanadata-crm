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

const contacts = [
  { id: '1', name: 'امیرحسین رضایی', email: 'amir@example.com', company: 'سنا تک', status: 'customer', stage: 'won', phone: '۰۹۱۲۰۰۰۰۰۰۰' },
  { id: '2', name: 'سارا احمدی', email: 'sara@example.com', company: 'پارس کو', status: 'prospect', stage: 'proposal', phone: '۰۹۱۲۱۱۱۱۱۱۱' },
  { id: '3', name: 'رضا مرادی', email: 'reza@example.com', company: 'راهکارهای جهانی', status: 'lead', stage: 'new', phone: '۰۹۱۲۲۲۲۲۲۲۲' },
  { id: '4', name: 'مریم زارع', email: 'maryam@example.com', company: 'آژانس خلاق', status: 'customer', stage: 'won', phone: '۰۹۱۲۳۳۳۳۳۳۳' },
  { id: '5', name: 'علی کریمی', email: 'ali@example.com', company: 'سیستم‌های آینده', status: 'prospect', stage: 'negotiation', phone: '۰۹۱۲۴۴۴۴۴۴۴' },
];

const statusColors = {
  customer: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  prospect: 'bg-blue-50 text-blue-600 border-blue-100',
  lead: 'bg-slate-50 text-slate-600 border-slate-100',
  churned: 'bg-red-50 text-red-600 border-red-100',
};

const statusLabels = {
  customer: 'مشتری',
  prospect: 'مشتری احتمالی',
  lead: 'سرنخ',
  churned: 'ریزش کرده',
};

const stageLabels = {
  won: 'موفق',
  proposal: 'پیشنهاد',
  new: 'جدید',
  negotiation: 'مذاکره',
};

export function CRMDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">مدیریت مشتریان (CRM)</h1>
          <p className="text-gray-500">مخاطبین و خط لوله فروش خود را مدیریت کنید.</p>
        </div>
        <Button className="bg-black text-white rounded-lg">
          <UserPlus className="w-4 h-4 ml-2" />
          افزودن مخاطب
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">کل سرنخ‌ها</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">۱,۲۸۴</div>
            <p className="text-xs text-green-600 font-medium mt-1">+۱۲٪ نسبت به ماه گذشته</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">نرخ تبدیل</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">۲۴.۵٪</div>
            <p className="text-xs text-green-600 font-medium mt-1">+۳.۲٪ نسبت به ماه گذشته</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">ارزش خط لوله</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">۴۵۲,۰۰۰,۰۰۰ تومان</div>
            <p className="text-xs text-blue-600 font-medium mt-1">۸ معامله فعال</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="جستجوی مخاطبین..." 
              className="pr-10 bg-gray-50 border-none focus-visible:ring-black"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-lg">
              <Filter className="w-4 h-4 ml-2" />
              فیلتر
            </Button>
            <Button variant="outline" size="sm" className="rounded-lg">
              خروجی اکسل
            </Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-gray-100">
              <TableHead className="w-[250px] text-right">مخاطب</TableHead>
              <TableHead className="text-right">شرکت</TableHead>
              <TableHead className="text-right">وضعیت</TableHead>
              <TableHead className="text-right">مرحله</TableHead>
              <TableHead className="text-left">عملیات</TableHead>
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
                    <div className="text-right">
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
                  <Badge variant="outline" className={cn("font-medium", statusColors[contact.status as keyof typeof statusColors])}>
                    {statusLabels[contact.status as keyof typeof statusLabels]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="text-sm font-medium text-gray-700">
                    {stageLabels[contact.stage as keyof typeof stageLabels]}
                  </div>
                </TableCell>
                <TableCell className="text-left">
                  <div className="flex items-center justify-start gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Mail className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-8 w-8")}>
                        <MoreVertical className="w-4 h-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem className="text-right">ویرایش مخاطب</DropdownMenuItem>
                        <DropdownMenuItem className="text-right">مشاهده فعالیت‌ها</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 text-right">حذف</DropdownMenuItem>
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
