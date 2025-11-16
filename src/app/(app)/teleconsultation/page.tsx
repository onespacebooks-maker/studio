'use client';

import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AnimatedVideoIcon } from '@/components/ui/animated-video-icon';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';

const initialDoctors = [
  {
    name: 'Dr. Priya Sharma',
    speciality: 'General Physician',
    experience: '12 years',
    languages: 'English, Hindi',
    availability: 'Available in 15 mins',
    avatarSeed: 'doc1',
  },
  {
    name: 'Dr. Arjun Reddy',
    speciality: 'Dermatologist',
    experience: '8 years',
    languages: 'English, Telugu',
    availability: 'Available Now',
    avatarSeed: 'doc2',
  },
  {
    name: 'Dr. Meera Iyer',
    speciality: 'Psychiatrist',
    experience: '15 years',
    languages: 'English, Tamil',
    availability: 'Available tomorrow',
    avatarSeed: 'doc3',
  },
  {
    name: 'Dr. Sameer Khan',
    speciality: 'Pediatrician',
    experience: '10 years',
    languages: 'English, Hindi, Marathi',
    availability: 'Available Now',
    avatarSeed: 'doc4',
  },
];

const initialPastConsultations = [
    { name: 'Dr. Rina Patel', speciality: 'Gynecologist', date: 'June 15, 2024', avatarSeed: 'doc5' },
    { name: 'Dr. Alok Verma', speciality: 'Orthopedist', date: 'May 28, 2024', avatarSeed: 'doc6' },
]

export default function TeleconsultationPage() {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [pastConsultations, setPastConsultations] = useState(initialPastConsultations);
  const { toast } = useToast();

  const handleBookCall = (doctorToBook: (typeof initialDoctors)[0]) => {
    setDoctors((prevDoctors) =>
      prevDoctors.map((doctor) => {
        if (
          doctor.name === doctorToBook.name &&
          doctor.availability === 'Available Now'
        ) {
          return { ...doctor, availability: 'On a Call' };
        }
        return doctor;
      })
    );

    setPastConsultations(prev => [
        { name: doctorToBook.name, speciality: doctorToBook.speciality, date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric'}), avatarSeed: doctorToBook.avatarSeed},
        ...prev
    ])

    toast({
      title: 'Teleconsultation Booked!',
      description: `Your video call with ${doctorToBook.name} has been scheduled.`,
    });
  };

  return (
    <>
      <Header title="Teleconsultation" />
      <main className="flex-1 space-y-8 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold font-headline tracking-tight">
              Consult a Doctor from Home
            </h2>
            <p className="text-muted-foreground">
              Connect with top specialists via video call at your convenience.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {doctors.map((doc) => (
            <Card key={doc.name} className="flex flex-col">
              <CardHeader className="items-center">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage
                    src={`https://picsum.photos/seed/${doc.avatarSeed}/200`}
                    alt={doc.name}
                  />
                  <AvatarFallback>{doc.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle>{doc.name}</CardTitle>
                <CardDescription>{doc.speciality}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-center space-y-2 flex-grow">
                <p className="text-muted-foreground">
                  {doc.experience} of experience
                </p>
                <p className="text-muted-foreground">
                  Speaks: {doc.languages}
                </p>
                <p
                  className={`font-semibold ${
                    doc.availability === 'Available Now'
                      ? 'text-green-600'
                      : doc.availability === 'On a Call'
                      ? 'text-red-600'
                      : 'text-amber-600'
                  }`}
                >
                  {doc.availability}
                </p>
              </CardContent>
              <CardFooter>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      className="w-full"
                      disabled={doc.availability !== 'Available Now'}
                    >
                      <AnimatedVideoIcon className="mr-2 h-4 w-4" />
                      {doc.availability === 'On a Call' ? 'On a Call' : 'Book Call'}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Confirm Video Consultation
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to book a video call with{' '}
                        {doc.name}?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleBookCall(doc)}
                      >
                        Confirm Booking
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <Separator />

        <Card>
            <CardHeader>
                <CardTitle>Consultation History</CardTitle>
                <CardDescription>Review your past teleconsultations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {pastConsultations.map((consultation, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                            <Avatar>
                                <AvatarImage src={`https://picsum.photos/seed/${consultation.avatarSeed}/100`} alt={consultation.name} />
                                <AvatarFallback>{consultation.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{consultation.name}</p>
                                <p className="text-sm text-muted-foreground">{consultation.speciality}</p>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{consultation.date}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
      </main>
    </>
  );
}
