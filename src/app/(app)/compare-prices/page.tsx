'use client';

import { Header } from '@/components/header';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Badge } from '@/components/ui/badge';
import { AnimatedPercentIcon } from '@/components/ui/animated-percent-icon';

const priceData = [
  {
    treatment: 'Knee Replacement',
    hospitalA: 250000,
    hospitalB: 275000,
    hospitalC: 260000,
    insurancePrice: 220000,
  },
  {
    treatment: 'Cataract Surgery (per eye)',
    hospitalA: 40000,
    hospitalB: 45000,
    hospitalC: 38000,
    insurancePrice: 32000,
  },
  {
    treatment: 'Angioplasty (with one stent)',
    hospitalA: 350000,
    hospitalB: 370000,
    hospitalC: 360000,
    insurancePrice: 300000,
  },
  {
    treatment: 'Maternity Package (Normal Delivery)',
    hospitalA: 75000,
    hospitalB: 85000,
    hospitalC: 80000,
    insurancePrice: 65000,
  },
  {
    treatment: 'Chemotherapy (per cycle)',
    hospitalA: 60000,
    hospitalB: 65000,
    hospitalC: 58000,
    insurancePrice: 50000,
  },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function ComparePricesPage() {
  return (
    <>
      <Header title="Compare Treatment Prices" />
      <main className="flex-1 space-y-8 p-4 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle>Treatment Cost Comparison</CardTitle>
            <CardDescription>
              Make informed decisions by comparing procedure costs from top hospitals. 
              Prices shown are estimates for standard packages.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Treatment / Procedure</TableHead>
                  <TableHead>Apollo Hospital</TableHead>
                  <TableHead>Fortis Hospital</TableHead>
                  <TableHead>Max Healthcare</TableHead>
                  <TableHead className="text-right text-primary font-semibold">
                    Your Price (with Insurance)
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {priceData.map((row) => (
                  <TableRow key={row.treatment}>
                    <TableCell className="font-medium">{row.treatment}</TableCell>
                    <TableCell>{formatCurrency(row.hospitalA)}</TableCell>
                    <TableCell>{formatCurrency(row.hospitalB)}</TableCell>
                    <TableCell>{formatCurrency(row.hospitalC)}</TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant="default"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        {formatCurrency(row.insurancePrice)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="text-sm text-muted-foreground flex items-center gap-2">
                <AnimatedPercentIcon className="w-4 h-4" />
                <p>
                    <span className="font-semibold text-foreground">Save More:</span> Use your Health Wallet balance or flexible EMIs at checkout for extra discounts.
                </p>
            </div>
          </CardFooter>
        </Card>
      </main>
    </>
  );
}
