
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppContext, type Doctor } from '@/context/AppContext';

const initialPastConsultations = [
  {
    name: 'Dr. Rina Patel',
    speciality: 'Gynecologist',
    date: 'June 15, 2024',
    avatarSeed: 'doc5',
  },
  {
    name: 'Dr. Alok Verma',
    speciality: 'Orthopedist',
    date: 'May 28, 2024',
    avatarSeed: 'doc6',
  },
];

const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
];


export default function TeleconsultationPage() {
  const { doctors, updateDoctor } = useAppContext();
  const [pastConsultations, setPastConsultations] =
    useState(initialPastConsultations);
  const { toast } = useToast();

  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [specialityFilter, setSpecialityFilter] = useState('All Departments');

  const specialities = [
    'All Departments',
    ...Array.from(new Set(doctors.map(d => d.speciality)))
  ];

  const handleBookCall = () => {
    if (!selectedDoctor) return;

    // For "Available Now", we can skip date/time check or handle it differently
    if (selectedDoctor.availability !== 'Available Now' && (!date || !time)) {
      toast({
        title: 'Incomplete Information',
        description: 'Please select a date and time for the consultation.',
        variant: 'destructive',
      });
      return;
    }

    if(selectedDoctor.availability === 'Available Now') {
        updateDoctor({ ...selectedDoctor, availability: 'On a Call' });
    }

    setPastConsultations((prev) => [
      {
        name: selectedDoctor.name,
        speciality: selectedDoctor.speciality,
        date: date ? `${format(date, 'MMMM d, yyyy')} at ${time}` : new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric'}),
        avatarSeed: selectedDoctor.avatarSeed,
      },
      ...prev,
    ]);

    toast({
      title: 'Teleconsultation Booked!',
      description: `Your video call with ${selectedDoctor.name} has been scheduled.`,
    });

    // Reset form and close dialog
    setIsDialogOpen(false);
    setSelectedDoctor(null);
    setDate(undefined);
    setTime('');
  };
  
  const filteredDoctors = specialityFilter === 'All Departments' 
    ? doctors 
    : doctors.filter(doc => doc.speciality === specialityFilter);

  return (
    <>
      <Header title="Teleconsultation" />
      <main className="flex-1 space-y-8 p-4 md:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold font-headline tracking-tight">
              Consult a Doctor from Home
            </h2>
            <p className="text-muted-foreground">
              Connect with top specialists via video call at your convenience.
            </p>
          </div>
          <div className="w-full md:w-auto">
            <Select value={specialityFilter} onValueChange={setSpecialityFilter}>
                <SelectTrigger className="w-full md:w-[280px]">
                    <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                    {specialities.map(s => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDoctors.map((doc) => (
              <Card key={doc.value} className="flex flex-col">
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
                  <DialogTrigger asChild>
                    <Button
                      className="w-full"
                      onClick={() => setSelectedDoctor(doc)}
                      disabled={doc.availability === 'On a Call'}
                    >
                      <AnimatedVideoIcon className="mr-2 h-4 w-4" />
                       {doc.availability === 'Available Now' ? 'Book Instant Call' : 'Schedule Call'}
                    </Button>
                  </DialogTrigger>
                </CardFooter>
              </Card>
            ))}
          </div>
          {filteredDoctors.length === 0 && (
            <Card className="text-center p-8">
                <CardHeader>
                    <CardTitle>No Doctors Found</CardTitle>
                    <CardDescription>
                        There are no doctors available in the selected department. Please try another one.
                    </CardDescription>
                </CardHeader>
            </Card>
          )}

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Schedule Video Consultation</DialogTitle>
              <DialogDescription>
                Select a date and time for your call with{' '}
                {selectedDoctor?.name}.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
               {selectedDoctor?.availability === 'Available Now' ? (
                 <div className="text-center p-4 bg-green-100 dark:bg-green-900/50 rounded-md">
                    <p className="font-semibold text-green-700 dark:text-green-300">This doctor is available for an instant call.</p>
                    <p className="text-sm text-muted-foreground">You can confirm to start the call immediately.</p>
                 </div>
               ) : (
                <>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="date">Consultation Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !date && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="time">Time</Label>
                <Select value={time} onValueChange={setTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              </>
              )}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" onClick={handleBookCall}>
                Confirm Booking
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Separator />

        <Card>
          <CardHeader>
            <CardTitle>Consultation History</CardTitle>
            <CardDescription>
              Review your past teleconsultations.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pastConsultations.map((consultation, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src={`https://picsum.photos/seed/${consultation.avatarSeed}/100`}
                      alt={consultation.name}
                    />
                    <AvatarFallback>
                      {consultation.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{consultation.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {consultation.speciality}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {consultation.date}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </>
  );
}
