'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { getDepartmentSuggestion } from './actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2, Lightbulb, Loader2 } from 'lucide-react';
import React from 'react';

const initialState = {
  data: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        'Get Suggestion'
      )}
    </Button>
  );
}

export function SymptomForm() {
  const [state, formAction] = useFormState(getDepartmentSuggestion, initialState);
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleFormAction = (formData: FormData) => {
    formAction(formData);
  };
  
  React.useEffect(() => {
    if (state.data) {
        formRef.current?.reset();
    }
  }, [state.data])

  return (
    <div className="space-y-6">
      <form ref={formRef} action={handleFormAction} className="space-y-4">
        <div className="grid w-full gap-1.5">
          <Label htmlFor="symptoms">Describe your symptoms</Label>
          <Textarea
            name="symptoms"
            id="symptoms"
            placeholder="e.g., 'I have a persistent cough, chest pain, and difficulty breathing for the last 3 days.'"
            rows={5}
            required
            minLength={10}
          />
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-xs text-muted-foreground">
            Please be as descriptive as possible for a better suggestion.
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
        <Card className="bg-secondary/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              <CardTitle className="font-headline text-xl">
                Suggestion Received
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold text-muted-foreground">
                Suggested Department
              </p>
              <p className="text-2xl font-bold text-primary">
                {state.data.suggestedDepartment}
              </p>
            </div>
            <div>
              <p className="font-semibold text-muted-foreground">Reasoning</p>
              <p className="text-foreground">{state.data.reasoning}</p>
            </div>
            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>Disclaimer</AlertTitle>
              <AlertDescription>
                This is an AI-powered suggestion and not a medical diagnosis.
                Please consult a qualified healthcare professional for an
                accurate diagnosis and treatment.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
