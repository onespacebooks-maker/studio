'use client';

import { Header } from '@/components/header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { IndianRupeeIcon } from '@/components/ui/IndianRupeeIcon';

const chartData = [
  { month: 'January', savings: 186 },
  { month: 'February', savings: 305 },
  { month: 'March', savings: 237 },
  { month: 'April', savings: 450 },
  { month: 'May', savings: 250 },
  { month: 'June', savings: 380 },
];

const chartConfig = {
  savings: {
    label: 'Savings',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

const transactions = [
  {
    description: 'Micro-savings Deposit',
    date: 'June 20, 2024',
    amount: 50.0,
    type: 'credit',
  },
  {
    description: "Dr. Sharma's Consultation Fee",
    date: 'June 18, 2024',
    amount: -800.0,
    type: 'debit',
  },
  {
    description: 'Micro-savings Deposit',
    date: 'June 15, 2024',
    amount: 100.0,
    type: 'credit',
  },
  {
    description: 'Pharmacy Bill Payment',
    date: 'June 12, 2024',
    amount: -1250.0,
    type: 'debit',
  },
];

const formatCurrency = (amount: number) => {
  const absAmount = Math.abs(amount).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const sign = amount < 0 ? '-' : '';
  return `${sign}₹${absAmount}`;
};

export default function WalletPage() {
  return (
    <>
      <Header title="Health Wallet" />
      <main className="flex-1 space-y-8 p-4 md:p-8">
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Current Balance</CardTitle>
              <CardDescription>
                Your available funds for healthcare expenses.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold">
                {formatCurrency(5231.89)}
              </div>
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Monthly Savings</CardTitle>
              <CardDescription>
                Your micro-savings contributions over the last 6 months.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-48 w-full">
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                   <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar dataKey="savings" fill="var(--color-savings)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((t, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{t.description}</TableCell>
                    <TableCell className="text-muted-foreground">{t.date}</TableCell>
                    <TableCell
                      className={`text-right font-semibold ${
                        t.type === 'credit'
                          ? 'text-green-600'
                          : 'text-destructive'
                      }`}
                    >
                      {formatCurrency(t.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
