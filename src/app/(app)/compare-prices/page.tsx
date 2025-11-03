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
import { IndianRupeeIcon } from '@/components/ui/IndianRupeeIcon';

const priceData = [
  {
    treatment: 'Knee Replacement',
    insurancePrice: 220000,
  },
  {
    treatment: 'Cataract Surgery (per eye)',
    insurancePrice: 32000,
  },
  {
    treatment: 'Angioplasty (with one stent)',
    insurancePrice: 300000,
  },
  {
    treatment: 'Maternity Package (Normal Delivery)',
    insurancePrice: 65000,
  },
  {
    treatment: 'Chemotherapy (per cycle)',
    insurancePrice: 50000,
  },
];

const formatCurrency = (amount: number) => {
  return amount.toLocaleString('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export default function ComparePricesPage() {
  return (
    <>
      <Header title="Treatment Prices" />
      <main className="flex-1 space-y-8 p-4 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle>Your Covered Treatment Prices</CardTitle>
            <CardDescription>
              Review the estimated costs for various procedures with your
              insurance plan.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">
                    Treatment / Procedure
                  </TableHead>
                  <TableHead className="text-right text-primary font-semibold">
                    Your Price (with Insurance)
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {priceData.map((row) => (
                  <TableRow key={row.treatment}>
                    <TableCell className="font-medium">
                      {row.treatment}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant="default"
                        className="bg-green-600 hover:bg-green-700 text-base"
                      >
                        <IndianRupeeIcon size={16} className="mr-1" />
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
                <span className="font-semibold text-foreground">
                  Save More:
                </span>{' '}
                Use your Health Wallet balance or flexible EMIs at checkout for
                extra discounts.
              </p>
            </div>
          </CardFooter>
        </Card>
      </main>
    </>
  );
}
