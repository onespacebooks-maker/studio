
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
import { IndianRupeeIcon } from '@/components/ui/IndianRupeeIcon';
import { useTranslation } from '@/context/LanguageContext';

const priceData = [
  {
    procedure: 'Angioplasty',
    yourPrice: 250000,
  },
  {
    procedure: 'Knee Replacement',
    yourPrice: 350000,
  },
  {
    procedure: 'Cataract Surgery',
    yourPrice: 40000,
  },
  {
    procedure: 'Maternity Package (Normal Delivery)',
    yourPrice: 75000,
  },
  {
    procedure: 'MRI Scan',
    yourPrice: 8000,
  },
  {
    procedure: 'Heart Bypass Surgery',
    yourPrice: 450000,
  },
  {
    procedure: 'Gallbladder Removal',
    yourPrice: 120000,
  },
  {
    procedure: 'Hernia Repair',
    yourPrice: 90000,
  },
  {
    procedure: 'Appendectomy',
    yourPrice: 85000,
  },
  {
    procedure: 'Chemotherapy (per cycle)',
    yourPrice: 50000,
  },
];


const formatCurrency = (amount: number) => {
  return amount.toLocaleString('en-IN', {
    maximumFractionDigits: 0,
  });
};

export default function ComparePricesPage() {
    const { t } = useTranslation();
  return (
    <>
      <Header title={t('prices.headerTitle')} />
      <main className="flex-1 space-y-8 p-4 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle>{t('prices.pageTitle')}</CardTitle>
            <CardDescription>
              {t('prices.pageDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('prices.table.procedure')}</TableHead>
                  <TableHead className="text-right text-primary font-semibold">
                    {t('prices.table.yourPrice')}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {priceData.map((row) => (
                  <TableRow key={row.procedure}>
                    <TableCell className="font-medium">
                      {row.procedure}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant="default"
                        className="bg-green-600 hover:bg-green-700 text-base"
                      >
                        <IndianRupeeIcon size={16} className="mr-1" />
                        {formatCurrency(row.yourPrice)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              {t('prices.footerNote')}
            </p>
          </CardFooter>
        </Card>
      </main>
    </>
  );
}
