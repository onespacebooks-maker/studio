
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// Data Types
export type Appointment = {
  doctor: string;
  speciality: string;
  time: string;
  hospital: string;
};

export type PastAppointment = Appointment & {
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

export type Doctor = {
  value: string;
  name: string;
  speciality: string;
  hospital: string;
  experience: string;
  languages: string;
  availability: string;
  avatarSeed: string;
};

export type Medicine = {
  name: string;
  manufacturer: string;
  packSize: string;
  price: number;
  stock: number;
};

export type FamilyMember = {
  name: string;
  relationship: string;
  age: number;
  avatarSeed: string;
};

// Context Type
type AppContextType = {
  upcomingAppointments: Appointment[];
  pastAppointments: PastAppointment[];
  doctors: Doctor[];
  medicines: Medicine[];
  familyMembers: FamilyMember[];
  addAppointment: (appointment: Appointment) => void;
  cancelAppointment: (index: number) => void;
  addDoctor: (doctor: Doctor) => void;
  updateDoctor: (doctor: Doctor) => void;
  deleteDoctor: (value: string) => void;
  addMedicine: (medicine: Medicine) => void;
  updateMedicine: (medicine: Medicine) => void;
  deleteMedicine: (name: string) => void;
  addFamilyMember: (member: Omit<FamilyMember, 'avatarSeed'>) => void;
  deleteFamilyMember: (name: string) => void;
};

// Context Initialization
const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial Data
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
    { value: 'dr-sharma', name: 'Dr. Anjali Sharma', speciality: 'Cardiologist', hospital: 'Apollo Hospital, Delhi', experience: "15 years", languages: "English, Hindi", availability: "Available Now", avatarSeed: "doc1" },
    { value: 'dr-reddy', name: 'Dr. Arjun Reddy', speciality: 'Cardiologist', hospital: 'Fortis Hospital, Delhi', experience: "12 years", languages: "English, Telugu", availability: "Available tomorrow", avatarSeed: "doc2" },
    { value: 'dr-singh', name: 'Dr. Vikram Singh', speciality: 'Dermatologist', hospital: 'Fortis Clinic, Mumbai', experience: "10 years", languages: "English, Hindi", availability: "Available Now", avatarSeed: "doc3" },
    { value: 'dr-gupta', name: 'Dr. Isha Gupta', speciality: 'Dermatologist', hospital: 'Max Healthcare, Mumbai', experience: "8 years", languages: "English, Hindi, Marathi", availability: "Available in 30 mins", avatarSeed: "doc4" },
    { value: 'dr-mehta', name: 'Dr. Priya Mehta', speciality: 'Pediatrician', hospital: 'Max Healthcare, Bangalore', experience: "12 years", languages: "English, Hindi", availability: "Available tomorrow", avatarSeed: "doc5" },
    { value: 'dr-khan', name: 'Dr. Sameer Khan', speciality: 'Pediatrician', hospital: 'Rainbow Children\'s Hospital, Bangalore', experience: "9 years", languages: "English, Hindi, Kannada", availability: "Available Now", avatarSeed: "doc6" },
    { value: 'dr-desai', name: 'Dr. Rohan Desai', speciality: 'Orthopedist', hospital: 'City Hospital, Pune', experience: "14 years", languages: "English, Marathi", availability: "Available Now", avatarSeed: "doc7" },
    { value: 'dr-verma', name: 'Dr. Alok Verma', speciality: 'Orthopedist', hospital: 'Sancheti Hospital, Pune', experience: "11 years", languages: "English, Hindi", availability: "Available in 20 mins", avatarSeed: "doc8" },
    { value: 'dr-iyer', name: 'Dr. Meera Iyer', speciality: 'Psychiatrist', hospital: 'NIMHANS, Bangalore', experience: "18 years", languages: "English, Tamil, Kannada", availability: "Available tomorrow", avatarSeed: "doc9" },
    { value: 'dr-anand', name: 'Dr. Anand Desai', speciality: 'Psychiatrist', hospital: 'VIMHANS, Delhi', experience: "16 years", languages: "English, Hindi, Gujarati", availability: "Available Now", avatarSeed: "doc10" },
    { value: 'dr-patel', name: 'Dr. Rina Patel', speciality: 'Gynecologist', hospital: 'Cloudnine Hospital, Mumbai', experience: "13 years", languages: "English, Gujarati, Hindi", availability: "Available in 45 mins", avatarSeed: "doc11" },
    { value: 'dr-rao', name: 'Dr. Sunita Rao', speciality: 'Gynecologist', hospital: 'Manipal Hospital, Bangalore', experience: "20 years", languages: "English, Kannada, Telugu", availability: "Available Now", avatarSeed: "doc12" },
];

const initialMedicines: Medicine[] = [
  { name: 'Paracetamol 500mg', manufacturer: 'Cipla Ltd.', packSize: '15 tablets', price: 25.5, stock: 150 },
  { name: 'Atorvastatin 10mg', manufacturer: 'Sun Pharma', packSize: '10 tablets', price: 90.0, stock: 80 },
  { name: 'Metformin 500mg', manufacturer: 'Mankind Pharma', packSize: '10 tablets', price: 30.0, stock: 18 },
  { name: 'Amlodipine 5mg', manufacturer: "Dr. Reddy's Labs", packSize: '30 tablets', price: 65.0, stock: 250 },
  { name: 'Omeprazole 20mg', manufacturer: 'Zydus Cadila', packSize: '15 capsules', price: 55.0, stock: 9 },
  { name: 'Levocetirizine 5mg', manufacturer: 'Glenmark Pharma', packSize: '10 tablets', price: 45.0, stock: 75 },
  { name: 'Telmisartan 40mg', manufacturer: 'Lupin Ltd.', packSize: '15 tablets', price: 150.0, stock: 40 },
  { name: 'Azithromycin 500mg', manufacturer: 'Alembic Pharma', packSize: '3 tablets', price: 119.5, stock: 5 },
];

const initialFamilyMembers: FamilyMember[] = [
    { name: 'Meena Kumar', relationship: 'Spouse', age: 38, avatarSeed: 'family1' },
    { name: 'Aarav Kumar', relationship: 'Son', age: 12, avatarSeed: 'family2' },
    { name: 'Ananya Kumar', relationship: 'Daughter', age: 8, avatarSeed: 'family3' },
];

// Provider Component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>(initialUpcomingAppointments);
  const [pastAppointments, setPastAppointments] = useState<PastAppointment[]>(initialPastAppointments);
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [medicines, setMedicines] = useState<Medicine[]>(initialMedicines);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(initialFamilyMembers);

  // Appointment Management
  const addAppointment = (appointment: Appointment) => {
    setUpcomingAppointments(prev => [appointment, ...prev]);
  };

  const cancelAppointment = (index: number) => {
    setUpcomingAppointments(prev => prev.filter((_, i) => i !== index));
  };

  // Doctor Management
  const addDoctor = (doctor: Doctor) => {
    setDoctors(prev => [doctor, ...prev]);
  };

  const updateDoctor = (updatedDoctor: Doctor) => {
    setDoctors(prev => prev.map(doc => doc.value === updatedDoctor.value ? updatedDoctor : doc));
  };

  const deleteDoctor = (value: string) => {
      setDoctors(prev => prev.filter(doc => doc.value !== value));
  }

  // Medicine Management
  const addMedicine = (medicine: Medicine) => {
      setMedicines(prev => [medicine, ...prev]);
  };

  const updateMedicine = (updatedMedicine: Medicine) => {
      setMedicines(prev => prev.map(med => med.name === updatedMedicine.name ? updatedMedicine : med));
  };

  const deleteMedicine = (name: string) => {
      setMedicines(prev => prev.filter(med => med.name !== name));
  }

  // Family Member Management
  const addFamilyMember = (member: Omit<FamilyMember, 'avatarSeed'>) => {
    const newMember = {
        ...member,
        avatarSeed: `family${Math.random()}`
    };
    setFamilyMembers(prev => [...prev, newMember]);
  };
  
  const deleteFamilyMember = (name: string) => {
      setFamilyMembers(prev => prev.filter(member => member.name !== name));
  };

  return (
    <AppContext.Provider value={{ 
        upcomingAppointments, 
        pastAppointments, 
        doctors, 
        medicines,
        familyMembers,
        addAppointment, 
        cancelAppointment,
        addDoctor,
        updateDoctor,
        deleteDoctor,
        addMedicine,
        updateMedicine,
        deleteMedicine,
        addFamilyMember,
        deleteFamilyMember,
    }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom Hook
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
