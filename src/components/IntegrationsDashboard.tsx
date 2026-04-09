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
    name: 'ثبت‌نام کاربر ← CRM', 
    description: 'ایجاد مخاطب در CRM هنگام ثبت‌نام کاربر جدید.',
    source: 'کاربران',
    target: 'CRM',
    isActive: true,
    lastRun: '۲ دقیقه پیش',
    status: 'success'
  },
  { 
    id: '2', 
    name: 'پرداخت موفق ← حسابداری', 
    description: 'ایجاد سند حسابداری برای پرداخت‌های موفق.',
    source: 'پرداخت‌ها',
    target: 'حسابداری',
    isActive: true,
    lastRun: '۱ ساعت پیش',
    status: 'success'
  },
  { 
    id: '3', 
    name: 'ارسال فرم ← سرنخ CRM', 
    description: 'ایجاد سرنخ در CRM از طریق فرم‌های تماس.',
    source: 'فرم‌ها',
    target: 'CRM',
    isActive: false,
    lastRun: '۱ روز پیش',
    status: 'failed'
  },
  { 
    id: '4', 
    name: 'تیکت جدید ← اعلان', 
    description: 'اطلاع‌رسانی به تیم پشتیبانی برای تیکت‌های جدید.',
    source: 'تیکت‌ها',
    target: 'اعلان‌ها',
    isActive: true,
    lastRun: '۵ دقیقه پیش',
    status: 'success'
  },
];

export function IntegrationsDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">یکپارچه‌سازی</h1>
          <p className="text-gray-500">خودکارسازی جریان کار بین ماژول‌های مختلف.</p>
        </div>
        <Button className="bg-black text-white rounded-lg">
          <Plus className="w-4 h-4 ml-2" />
          ایجاد یکپارچه‌سازی
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
              <CardTitle className="text-xl font-bold text-right">{integration.name}</CardTitle>
              <CardDescription className="text-gray-500 line-clamp-2 text-right">
                {integration.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Clock className="w-3.5 h-3.5" />
                    آخرین اجرا: {integration.lastRun}
                  </div>
                  <div className={cn(
                    "flex items-center gap-1.5 text-xs font-medium",
                    integration.status === 'success' ? "text-emerald-600" : "text-red-600"
                  )}>
                    {integration.status === 'success' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    {integration.status === 'success' ? 'سالم' : 'خطا'}
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
        <h2 className="text-xl font-bold mb-6">گزارشات اجرا</h2>
        <Card className="border-none shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-gray-100">
                <TableHead className="text-right">زمان</TableHead>
                <TableHead className="text-right">یکپارچه‌سازی</TableHead>
                <TableHead className="text-right">وضعیت</TableHead>
                <TableHead className="text-right">مدت زمان</TableHead>
                <TableHead className="text-left">عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3, 4, 5].map((i) => (
                <TableRow key={i} className="hover:bg-gray-50 border-gray-100 transition-colors cursor-pointer">
                  <TableCell className="text-sm text-gray-500 text-right">۱۴۰۳/۰۱/۲۵ ۱۰:۴۵:۰۶</TableCell>
                  <TableCell className="font-medium text-right">ثبت‌نام کاربر ← CRM</TableCell>
                  <TableCell className="text-right">
                    <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 font-medium">موفق</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500 text-right">۱۲۵ میلی‌ثانیه</TableCell>
                  <TableCell className="text-left">
                    <Button variant="ghost" size="sm">مشاهده داده</Button>
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
