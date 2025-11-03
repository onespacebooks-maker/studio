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
import { AnimatedIndianRupeeIcon } from '@/components/ui/animated-indian-rupee-icon';
import { AnimatedPercentIcon } from '@/components/ui/animated-percent-icon';


const priceData = [
  {
    medicine: 'Paracetamol (500mg, 15 tablets)',
    pharmacyA: 20,
    pharmacyB: 22,
    pharmacyC: 18,
    insurancePrice: 15,
  },
  {
    medicine: 'Atorvastatin (10mg, 30 tablets)',
    pharmacyA: 150,
    pharmacyB: 145,
    pharmacyC: 155,
    insurancePrice: 120,
  },
  {
    medicine: 'Metformin (500mg, 30 tablets)',
    pharmacyA: 45,
    pharmacyB: 50,
    pharmacyC: 48,
    insurancePrice: 35,
  },
  {
    medicine: 'Amlodipine (5mg, 30 tablets)',
    pharmacyA: 60,
    pharmacyB: 55,
    pharmacyC: 62,
    insurancePrice: 45,
  },
  {
    medicine: 'Cetirizine (10mg, 10 tablets)',
    pharmacyA: 25,
    pharmacyB: 28,
    pharmacyC: 24,
    insurancePrice: 20,
  },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount);
};

export default function ComparePricesPage() {
  return (
    <>
      <Header title="Compare Medicine Prices" />
      <main className="flex-1 space-y-8 p-4 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle>Medicine Price Comparison</CardTitle>
            <CardDescription>
              Make informed decisions by comparing medicine prices from popular online pharmacies.
              Prices shown are estimates.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Medicine</TableHead>
                  <TableHead>Apollo Pharmacy</TableHead>
                  <TableHead>Netmeds</TableHead>
                  <TableHead>1mg</TableHead>
                  <TableHead className="text-right text-primary font-semibold">
                    Your Price (with Insurance)
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {priceData.map((row) => (
                  <TableRow key={row.medicine}>
                    <TableCell className="font-medium">{row.medicine}</TableCell>
                    <TableCell>{formatCurrency(row.pharmacyA)}</TableCell>
                    <TableCell>{formatCurrency(row.pharmacyB)}</TableCell>
                    <TableCell>{formatCurrency(row.pharmacyC)}</TableCell>
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
