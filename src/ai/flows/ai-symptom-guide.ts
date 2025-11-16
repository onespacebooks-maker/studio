// This file is machine-generated - edit with care!
'use server';
/**
 * @fileOverview An AI symptom guide that suggests the appropriate medical department based on user-described symptoms.
 *
 * - suggestDepartment - A function that suggests a medical department based on symptoms.
 * - SuggestDepartmentInput - The input type for the suggestDepartment function.
 * - SuggestDepartmentOutput - The return type for the suggestDepartment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestDepartmentInputSchema = z.object({
  symptoms: z
    .string()
    .describe('A description of the symptoms the user is experiencing.'),
});
export type SuggestDepartmentInput = z.infer<typeof SuggestDepartmentInputSchema>;

const SuggestDepartmentOutputSchema = z.object({
  suggestedDepartment: z
    .string()
    .describe('The medical department the user should consult.'),
  reasoning: z
    .string()
    .describe('The reasoning behind the department suggestion.'),
  isDoctorVisitRecommended: z
    .boolean()
    .describe('Whether a visit to a doctor is recommended based on the symptoms.'),
});
export type SuggestDepartmentOutput = z.infer<typeof SuggestDepartmentOutputSchema>;

export async function suggestDepartment(input: SuggestDepartmentInput): Promise<SuggestDepartmentOutput> {
  return suggestDepartmentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestDepartmentPrompt',
  input: {schema: SuggestDepartmentInputSchema},
  output: {schema: SuggestDepartmentOutputSchema},
  prompt: `You are an AI assistant that suggests the appropriate medical department for a user based on their described symptoms.

  Symptoms: {{{symptoms}}}

  Consider various medical departments such as Cardiology, Dermatology, Gastroenterology, Neurology, Oncology, Ophthalmology, Orthopedics, Otolaryngology, Pediatrics, Psychiatry, Pulmonology, Rheumatology, Urology, and others.

  Suggest the most relevant medical department and explain your reasoning. Based on the symptoms, determine if a visit to a doctor is recommended.`,
});

const suggestDepartmentFlow = ai.defineFlow(
  {
    name: 'suggestDepartmentFlow',
    inputSchema: SuggestDepartmentInputSchema,
    outputSchema: SuggestDepartmentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
