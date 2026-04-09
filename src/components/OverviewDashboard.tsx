import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Wallet, 
  Zap, 
  ArrowUpRight, 
  ArrowDownRight,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

import { integrationService } from '@/lib/integration-service';
import { toast } from 'sonner';

const data = [
// ... existing data ...
  { name: 'شنبه', revenue: 4000, users: 2400 },
  { name: 'یکشنبه', revenue: 3000, users: 1398 },
  { name: 'دوشنبه', revenue: 2000, users: 9800 },
  { name: 'سه‌شنبه', revenue: 2780, users: 3908 },
  { name: 'چهارشنبه', revenue: 1890, users: 4800 },
  { name: 'پنجشنبه', revenue: 2390, users: 3800 },
  { name: 'جمعه', revenue: 3490, users: 4300 },
];

const stats = [
  { name: 'کل درآمد', value: '۱۲۸,۴۳۰,۰۰۰ تومان', change: '+۱۲.۵٪', icon: Wallet, trend: 'up' },
  { name: 'مخاطبین فعال', value: '۲,۴۲۰', change: '+۱۸.۲٪', icon: Users, trend: 'up' },
  { name: 'اتوماسیون‌های اجرا شده', value: '۴۵,۲۳۱', change: '-۲.۴٪', icon: Zap, trend: 'down' },
  { name: 'سلامت سیستم', value: '۹۹.۹٪', change: 'پایدار', icon: Activity, trend: 'neutral' },
];

export function OverviewDashboard() {
  const handleSeedData = async () => {
    try {
      const integrations = [
        {
          name: 'ثبت‌نام کاربر ← CRM',
          description: 'ایجاد مخاطب در CRM هنگام ثبت‌نام کاربر جدید.',
          sourceModule: 'users',
          triggerEvent: 'user.registered',
          isActive: true,
          priority: 10,
          actions: [
            {
              type: 'create',
              config: {
                targetModel: 'CRMContact',
                fieldMapping: {
                  name: '{{name}}',
                  email: '{{email}}',
                  status: 'lead'
                }
              }
            }
          ]
        },
        {
          name: 'پرداخت موفق ← حسابداری',
          description: 'ایجاد سند حسابداری برای پرداخت‌های موفق.',
          sourceModule: 'payments',
          triggerEvent: 'payment.completed',
          isActive: true,
          priority: 5,
          actions: [
            {
              type: 'create',
              config: {
                targetModel: 'AccountingEntry',
                fieldMapping: {
                  description: 'پرداخت بابت سفارش {{paymentId}}',
                  amount: '{{amount}}',
                  type: 'income'
                }
              }
            }
          ]
        }
      ];

      for (const integration of integrations) {
        await integrationService.createIntegration(integration as any);
      }

      toast.success('سیستم با موفقیت راه‌اندازی شد و داده‌های اولیه بارگذاری شدند.');
    } catch (error) {
      console.error('Error seeding data:', error);
      toast.error('خطا در راه‌اندازی سیستم.');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">نمای کلی</h1>
          <p className="text-gray-500">خوش آمدید، وضعیت امروز سیستم به این صورت است.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleSeedData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            راه‌اندازی اولیه سیستم
          </button>
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            دانلود گزارش
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name} className="border-none shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <stat.icon className="w-5 h-5 text-gray-600" />
                </div>
                <div className={cn(
                  "flex items-center text-xs font-medium px-2 py-1 rounded-full",
                  stat.trend === 'up' ? "bg-green-50 text-green-600" : 
                  stat.trend === 'down' ? "bg-red-50 text-red-600" : "bg-gray-50 text-gray-600"
                )}>
                  {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3 ml-1" /> : 
                   stat.trend === 'down' ? <ArrowDownRight className="w-3 h-3 ml-1" /> : null}
                  {stat.change}
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-1">{stat.name}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">رشد درآمد</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#000" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#000" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#999' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#999' }}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', textAlign: 'right' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#000" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">فعالیت‌های اخیر</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-2 h-2 mt-2 rounded-full bg-black shrink-0" />
                  <div className="text-right">
                    <p className="text-sm font-medium">یکپارچه‌سازی جدید اجرا شد</p>
                    <p className="text-xs text-gray-500">ثبت‌نام کاربر به مخاطب CRM • ۲ دقیقه پیش</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-6 text-sm text-gray-500">
              مشاهده همه فعالیت‌ها
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
