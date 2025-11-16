'use server';

import {
  getPolicySuggestions,
  type PolicySuggestionInput,
  type PolicySuggestion,
} from '@/ai/flows/government-policy-flow';
import { z } from 'zod';

const PolicySchema = z.object({
  name: z.string().min(1, "Name is required."),
  age: z.coerce.number().min(0, "Age must be a positive number."),
  gender: z.string().min(1, "Gender is required."),
  location: z.string().min(1, "Location is required."),
  income: z.coerce.number().min(0, "Income must be a positive number."),
  treatmentDetails: z.string().min(15, 'Please describe the treatment in more detail.'),
});

interface FormState {
  data: PolicySuggestion[] | null;
  error: string | null;
}

export async function checkPolicyEligibility(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawData = {
    name: formData.get('name'),
    age: formData.get('age'),
    gender: formData.get('gender'),
    location: formData.get('location'),
    income: formData.get('income'),
    treatmentDetails: formData.get('treatmentDetails'),
  };

  const validationResult = PolicySchema.safeParse(rawData);

  if (!validationResult.success) {
    return {
      data: null,
      error: validationResult.error.errors.map((e) => e.message).join(', '),
    };
  }
  
  const input: PolicySuggestionInput = validationResult.data;

  try {
    const result = await getPolicySuggestions(input);
    return { data: result.policies, error: null };
  } catch (e) {
    console.error(e);
    return { data: null, error: 'An unexpected error occurred while checking policies. Please try again.' };
  }
}
