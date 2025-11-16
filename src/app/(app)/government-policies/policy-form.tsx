'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { checkPolicyEligibility } from './actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  FileText,
  Loader2,
  Upload,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { IndianRupeeIcon } from '@/components/ui/IndianRupeeIcon';
import Image from 'next/image';

const initialState = {
  data: null,
  error: null,
};

const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", 
    "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", 
    "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", 
    "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", 
    "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", 
    "Ladakh", "Lakshadweep", "Puducherry"
  ];

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Checking Eligibility...
        </>
      ) : (
        'Check Eligibility'
      )}
    </Button>
  );
}

export function PolicyForm() {
  const [state, formAction] = useActionState(
    checkPolicyEligibility,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [photoDataUrl, setPhotoDataUrl] = useState('');


  useEffect(() => {
    if (state.data || state.error) {
      // Don't reset the form to allow user to see their input
    }
  }, [state.data, state.error]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setImagePreview(dataUrl);
        setPhotoDataUrl(dataUrl);
      };
      reader.readAsDataURL(file);
    } else {
        setImagePreview(null);
        setPhotoDataUrl('');
    }
  };

  return (
    <div className="space-y-6">
      <form ref={formRef} action={formAction} className="space-y-6">
        <input type="hidden" name="treatmentPhotoDataUrl" value={photoDataUrl} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="name">Full Name</Label>
            <Input name="name" id="name" placeholder="e.g., Ramesh Kumar" required />
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="age">Age</Label>
            <Input name="age" id="age" type="number" placeholder="e.g., 45" required />
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="gender">Gender</Label>
            <Select name="gender" required>
              <SelectTrigger id="gender">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="location">State/Union Territory</Label>
            <Select name="location" required>
              <SelectTrigger id="location">
                <SelectValue placeholder="Select your state/UT" />
              </SelectTrigger>
              <SelectContent>
                {indianStates.map(state => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="income">Annual Family Income (in INR)</Label>
            <div className='relative'>
                <IndianRupeeIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input name="income" id="income" type="number" placeholder="e.g., 250000" required className='pl-8'/>
            </div>
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="treatmentPhoto">Upload Treatment Document</Label>
            <Input name="treatmentPhoto" id="treatmentPhoto" type="file" accept="image/*" onChange={handleFileChange} />
          </div>
          <div className="grid w-full gap-1.5 md:col-span-2">
            <Label htmlFor="treatmentDetails">
              Describe the required medical treatment or situation
            </Label>
            <Textarea
              name="treatmentDetails"
              id="treatmentDetails"
              placeholder="e.g., 'Requires heart bypass surgery', 'Maternity and childbirth expenses', 'Seeking support for disability'"
              rows={3}
              required
              minLength={15}
            />
          </div>

          {imagePreview && (
            <div className="md:col-span-2 space-y-2">
                <Label>Document Preview</Label>
                <div className='relative aspect-video w-full max-w-sm mx-auto border rounded-md overflow-hidden'>
                    <Image src={imagePreview} alt="Treatment document preview" fill={true} objectFit="contain" />
                </div>
            </div>
          )}

        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            Your information will be used to check for eligible policies.
          </p>
          <SubmitButton />
        </div>
      </form>

      {state.error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      {state.data && (
        <div className="space-y-6 pt-6">
          <div className="text-center">
            <h3 className="text-xl font-bold font-headline">Eligibility Results</h3>
            <p className="text-muted-foreground">Based on the information provided, here are the policies you may be eligible for.</p>
          </div>

          {state.data.length === 0 ? (
            <Card className="flex flex-col items-center justify-center p-8 text-center bg-secondary/50">
                 <CardHeader>
                     <CardTitle>No Eligible Policies Found</CardTitle>
                     <CardDescription>
                         We could not find any matching government policies based on the details you provided.
                     </CardDescription>
                 </CardHeader>
             </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {state.data.map((policy, index) => (
                    <Card key={index} className='flex flex-col'>
                        <CardHeader>
                            <div className="flex items-start justify-between gap-4">
                                <CardTitle>{policy.policyName}</CardTitle>
                                <span className={`flex items-center text-xs font-semibold px-2 py-1 rounded-full ${policy.isEligible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {policy.isEligible ? 'Eligible' : 'Not Eligible'}
                                </span>
                            </div>
                            <CardDescription>{policy.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 flex-grow">
                            <div>
                                <p className="font-semibold text-sm mb-1">Eligibility Reason</p>
                                <p className="text-xs text-muted-foreground">{policy.eligibilityReason}</p>
                            </div>
                           {policy.isEligible && policy.bonds && (
                             <div>
                                <p className="font-semibold text-sm mb-1">Key Benefits / Bonds</p>
                                <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground">
                                    {policy.bonds.map((bond, i) => (
                                        <li key={i}>{bond}</li>
                                    ))}
                                </ul>
                            </div>
                           )}
                        </CardContent>
                        {policy.isEligible && (
                           <CardFooter>
                             <Button variant="link" className="p-0 h-auto">
                               Learn More <ArrowRight className="ml-2 h-4 w-4" />
                             </Button>
                           </CardFooter>
                        )}
                    </Card>
                ))}
            </div>
          )}
          
          <Alert>
              <FileText className="h-4 w-4" />
              <AlertTitle>Disclaimer</AlertTitle>
              <AlertDescription>
                This information is AI-generated and for guidance purposes only. Eligibility is determined by official government agencies. Please verify details on the official policy websites.
              </Aler_description>
            </Alert>
        </div>
      )}
    </div>
  );
}
