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
import { IndianRupee, Percent } from 'lucide-react';

const priceData = [
  {
    service: 'Full Body Checkup',
    hospitalA: 4500,
    hospitalB: 5000,
    hospitalC: 4200,
    insurancePrice: 3800,
  },
  {
    service: 'Dental Scaling & Polishing',
    hospitalA: 2000,
    hospitalB: 1800,
    hospitalC: 2200,
    insurancePrice: 1500,
  },
  {
    service: 'Cataract Surgery (per eye)',
    hospitalA: 35000,
    hospitalB: 40000,
    hospitalC: 32000,
    insurancePrice: 28000,
  },
  {
    service: 'Knee Replacement Surgery',
    hospitalA: 250000,
    hospitalB: 220000,
    hospitalC: 275000,
    insurancePrice: 190000,
  },
  {
    service: 'MRI Scan (Brain)',
    hospitalA: 8000,
    hospitalB: 7500,
    hospitalC: 8200,
    insurancePrice: 6000,
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
      <Header title="Compare Service Prices" />
      <main className="flex-1 space-y-8 p-4 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle>Treatment Cost Comparison</CardTitle>
            <CardDescription>
              Make informed decisions by comparing prices from top hospitals.
              Prices shown are estimates.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Service</TableHead>
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
                  <TableRow key={row.service}>
                    <TableCell className="font-medium">{row.service}</TableCell>
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
                <Percent className="w-4 h-4" />
                <p>
                    <span className="font-semibold text-foreground">Flexible Medical EMI:</span> Split your medical bills into easy monthly payments during checkout. No hidden costs.
                </p>
            </div>
          </CardFooter>
        </Card>
      </main>
    </>
  );
}
