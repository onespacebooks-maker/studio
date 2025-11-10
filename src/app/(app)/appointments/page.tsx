'use client';

import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AnimatedPlusCircleIcon } from '@/components/ui/animated-plus-circle-icon';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Separator } from '@/components/ui/separator';

const upcomingAppointments = [
  {
    doctor: 'Dr. Anjali Sharma',
    speciality: 'Cardiologist',
    time: 'Tomorrow at 10:30 AM',
    hospital: 'Apollo Hospital, Delhi',
  },
  {
    doctor: 'Dr. Vikram Singh',
    speciality: 'Dermatologist',
    time: 'June 28, 2024 at 3:00 PM',
    hospital: 'Fortis Clinic, Mumbai',
  },
  {
    doctor: 'Dr. Priya Mehta (for Aarav)',
    speciality: 'Pediatrician',
    time: 'July 2, 2024 at 11:00 AM',
    hospital: 'Max Healthcare, Bangalore',
  },
];

const pastAppointments = [
  {
    doctor: 'Dr. Rohan Desai',
    speciality: 'Orthopedist',
    time: 'May 15, 2024',
    hospital: 'City Hospital, Pune',
    report: {
      patient: 'Rohan Sharma',
      age: 42,
      gender: 'Male',
      diagnosis: 'Left Knee - Grade 2 Meniscus Tear',
      notes:
        'Patient reported sharp pain and swelling in the left knee after a fall. MRI confirms a grade 2 tear of the medial meniscus. Advised conservative treatment with physiotherapy for 6 weeks. NSAIDs prescribed for pain management. Follow-up scheduled to assess progress and determine if surgical intervention is necessary.',
      prescription: 'Ibuprofen 400mg (as needed for pain)',
      followUp: 'Follow-up appointment in 6 weeks.',
    },
  },
];

export default function AppointmentsPage() {
  return (
    <>
      <Header title="Appointments" />
      <main className="flex-1 space-y-8 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold font-headline tracking-tight">
              Manage Your Appointments
            </h2>
            <p className="text-muted-foreground">
              View, reschedule, or book new appointments for your family.
            </p>
          </div>
          <Button>
            <AnimatedPlusCircleIcon className="mr-2 h-4 w-4" />
            Book New Appointment
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>
              Here are your scheduled consultations.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAppointments.map((appt, i) => (
              <div
                key={i}
                className="p-4 border rounded-lg flex flex-wrap justify-between items-center gap-4"
              >
                <div>
                  <p className="font-semibold text-lg">{appt.doctor}</p>
                  <p className="text-muted-foreground">{appt.speciality}</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">{appt.time}</p>
                  <p className="text-muted-foreground">{appt.hospital}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">Reschedule</Button>
                  <Button variant="ghost">Cancel</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Past Appointments</CardTitle>
            <CardDescription>
              Review your previous consultation history.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pastAppointments.map((appt, i) => (
              <div
                key={i}
                className="p-4 border rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{appt.doctor}</p>
                  <p className="text-muted-foreground">{appt.speciality}</p>
                  <p className="text-sm text-muted-foreground">
                    {appt.time} at {appt.hospital}
                  </p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">View Report</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="max-w-2xl">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="font-headline text-2xl">
                        Medical Report
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Consultation with {appt.doctor} on {appt.time}.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <Separator />
                    <div className="space-y-4 text-sm max-h-[60vh] overflow-y-auto pr-4">
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <p className="font-semibold text-muted-foreground">
                            Patient Name
                          </p>
                          <p>{appt.report.patient}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-muted-foreground">
                            Age
                          </p>
                          <p>{appt.report.age}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-muted-foreground">
                            Gender
                          </p>
                          <p>{appt.report.gender}</p>
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold text-muted-foreground">
                          Diagnosis
                        </p>
                        <p className="font-bold text-primary">
                          {appt.report.diagnosis}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-muted-foreground">
                          Doctor's Notes
                        </p>
                        <p>{appt.report.notes}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-muted-foreground">
                          Prescription
                        </p>
                        <p>{appt.report.prescription}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-muted-foreground">
                          Follow-up Advice
                        </p>
                        <p>{appt.report.followUp}</p>
                      </div>
                    </div>
                    <Separator />
                    <AlertDialogFooter>
                      <AlertDialogAction>Close</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </>
  );
}
