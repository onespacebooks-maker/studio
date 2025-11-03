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
    medicine: 'Atorvastatin 20mg',
    form: 'Tablet',
    quantity: '30 tablets',
    price: 150,
  },
  {
    medicine: 'Metformin 500mg',
    form: 'Tablet',
    quantity: '60 tablets',
    price: 95,
  },
  {
    medicine: 'Amlodipine 5mg',
    form: 'Tablet',
    quantity: '30 tablets',
    price: 60,
  },
  {
    medicine: 'Paracetamol 650mg',
    form: 'Tablet',
    quantity: '15 tablets',
    price: 30,
  },
  {
    medicine: 'Salbutamol Inhaler',
    form: 'Inhaler',
    quantity: '200 doses',
    price: 250,
  },
];

export default function ComparePricesPage() {
  return (
    <>
      <Header title="Medicine Prices" />
      <main className="flex-1 space-y-8 p-4 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle>Your Covered Medicine Prices</CardTitle>
            <CardDescription>
              Review the estimated costs for common medicines with your
              insurance plan.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Medicine</TableHead>
                  <TableHead>Form</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead className="text-right text-primary font-semibold">
                    Your Price (with Insurance)
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {priceData.map((row) => (
                  <TableRow key={row.medicine}>
                    <TableCell className="font-medium">
                      {row.medicine}
                    </TableCell>
                    <TableCell>{row.form}</TableCell>
                    <TableCell>{row.quantity}</TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant="default"
                        className="bg-green-600 hover:bg-green-700 text-base"
                      >
                        <IndianRupeeIcon size={16} className="mr-1" />
                        {row.price.toFixed(2)}
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
