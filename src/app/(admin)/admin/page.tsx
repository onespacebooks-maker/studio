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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { DoctorsTable } from './doctors-table';
import { MedicinesTable } from './medicines-table';

export default function AdminPage() {
  return (
    <>
      <Header title="Admin Dashboard" />
      <main className="flex-1 space-y-8 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold font-headline tracking-tight">
              Application Management
            </h2>
            <p className="text-muted-foreground">
              Manage doctors, medicines, and other application data.
            </p>
          </div>
        </div>

        <Tabs defaultValue="doctors">
          <TabsList>
            <TabsTrigger value="doctors">Doctors</TabsTrigger>
            <TabsTrigger value="medicines">Medicines</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
          </TabsList>
          <TabsContent value="doctors">
            <Card>
              <CardHeader>
                <CardTitle>Manage Doctors</CardTitle>
                <CardDescription>
                  Add, edit, or remove doctors from the application. Changes will
                  be live for all users.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DoctorsTable />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="medicines">
            <Card>
              <CardHeader>
                <CardTitle>Manage Medicines</CardTitle>
                <CardDescription>
                  Add, edit, or remove medicines and their prices.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MedicinesTable />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle>View Appointments</CardTitle>
                <CardDescription>
                  Review all upcoming and past appointments booked by users.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Appointment management functionality is coming soon.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
