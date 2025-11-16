
'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AnimatedPlusCircleIcon } from '@/components/ui/animated-plus-circle-icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useAppContext, type FamilyMember } from '@/context/AppContext';
import { Trash2 } from 'lucide-react';

export default function FamilyPage() {
  const { familyMembers, addFamilyMember, deleteFamilyMember } = useAppContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddMember = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newMember: Omit<FamilyMember, 'avatarSeed'> = {
      name: formData.get('name') as string,
      relationship: formData.get('relationship') as string,
      age: parseInt(formData.get('age') as string, 10),
    };

    addFamilyMember(newMember);

    toast({
      title: 'Member Added',
      description: `${newMember.name} has been added to your family list.`,
    });

    setIsDialogOpen(false);
  };

  const handleDeleteMember = (name: string) => {
    deleteFamilyMember(name);
    toast({
      title: 'Member Removed',
      description: `${name} has been removed from your family list.`,
      variant: 'destructive',
    });
  }

  return (
    <>
      <Header title="Family Members" />
      <main className="flex-1 space-y-8 p-4 md:p-8">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold font-headline tracking-tight">
                Manage Your Family
              </h2>
              <p className="text-muted-foreground">
                Add and view members of your family to manage their healthcare.
              </p>
            </div>
            <DialogTrigger asChild>
              <Button>
                <AnimatedPlusCircleIcon className="mr-2 h-4 w-4" />
                Add New Member
              </Button>
            </DialogTrigger>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Family List</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {familyMembers.map((member) => (
                <Card key={member.name} className="relative">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        src={`https://picsum.photos/seed/${member.avatarSeed}/100`}
                        alt={member.name}
                      />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{member.name}</CardTitle>
                      <CardDescription>{member.relationship}</CardDescription>
                      <p className="text-sm text-muted-foreground">{member.age} years old</p>
                    </div>
                  </CardHeader>
                   <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive" onClick={() => handleDeleteMember(member.name)}>
                        <Trash2 className="h-4 w-4" />
                   </Button>
                </Card>
              ))}
              {familyMembers.length === 0 && (
                <p className='text-muted-foreground col-span-full text-center'>No family members added yet.</p>
              )}
            </CardContent>
          </Card>

          <DialogContent className="sm:max-w-md">
            <form onSubmit={handleAddMember}>
              <DialogHeader>
                <DialogTitle>Add a New Family Member</DialogTitle>
                <DialogDescription>
                  Enter the details of your family member.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="relationship">Relationship</Label>
                  <Input id="relationship" name="relationship" placeholder="e.g., Spouse, Child, Parent" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" name="age" type="number" required />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">Add Member</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </main>
    </>
  );
}
