'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Appointment = {
  doctor: string;
  speciality: string;
  time: string;
  hospital: string;
};

type PastAppointment = Appointment & {
  report: {
    patient: string;
    age: number;
    gender: string;
    diagnosis: string;
    notes: string;
    prescription: string;
    followUp: string;
  };
};

type Doctor = {
    value: string;
    label: string;
    speciality: string;
    hospital: string;
}

type AppointmentContextType = {
  upcomingAppointments: Appointment[];
  pastAppointments: PastAppointment[];
  doctors: Doctor[];
  addAppointment: (appointment: Appointment) => void;
  cancelAppointment: (index: number) => void;
};

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

const initialUpcomingAppointments: Appointment[] = [
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

const initialPastAppointments: PastAppointment[] = [
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

const initialDoctors: Doctor[] = [
    { value: 'dr-sharma', label: 'Dr. Anjali Sharma (Cardiologist)', speciality: 'Cardiologist', hospital: 'Apollo Hospital, Delhi' },
    { value: 'dr-reddy', label: 'Dr. Arjun Reddy (Cardiologist)', speciality: 'Cardiologist', hospital: 'Fortis Hospital, Delhi' },
    { value: 'dr-singh', label: 'Dr. Vikram Singh (Dermatologist)', speciality: 'Dermatologist', hospital: 'Fortis Clinic, Mumbai' },
    { value: 'dr-gupta', label: 'Dr. Isha Gupta (Dermatologist)', speciality: 'Dermatologist', hospital: 'Max Healthcare, Mumbai' },
    { value: 'dr-mehta', label: 'Dr. Priya Mehta (Pediatrician)', speciality: 'Pediatrician', hospital: 'Max Healthcare, Bangalore' },
    { value: 'dr-khan', label: 'Dr. Sameer Khan (Pediatrician)', speciality: 'Pediatrician', hospital: 'Rainbow Children\'s Hospital, Bangalore' },
    { value: 'dr-desai', label: 'Dr. Rohan Desai (Orthopedist)', speciality: 'Orthopedist', hospital: 'City Hospital, Pune' },
    { value: 'dr-verma', label: 'Dr. Alok Verma (Orthopedist)', speciality: 'Orthopedist', hospital: 'Sancheti Hospital, Pune' },
]

export const AppointmentProvider = ({ children }: { children: ReactNode }) => {
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>(initialUpcomingAppointments);
  const [pastAppointments, setPastAppointments] = useState<PastAppointment[]>(initialPastAppointments);
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);

  const addAppointment = (appointment: Appointment) => {
    setUpcomingAppointments(prev => [...prev, appointment]);
  };

  const cancelAppointment = (index: number) => {
    setUpcomingAppointments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <AppointmentContext.Provider value={{ upcomingAppointments, pastAppointments, doctors, addAppointment, cancelAppointment }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error('useAppointments must be used within an AppointmentProvider');
  }
  return context;
};
