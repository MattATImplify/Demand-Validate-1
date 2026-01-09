import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertLeadSchema, type InsertLead, pricingPlans } from "@shared/schema";
import { useCreateLead } from "@/hooks/use-leads";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface RegisterDialogProps {
  defaultPlan?: string;
  trigger?: React.ReactNode;
}

export function RegisterDialog({ defaultPlan, trigger }: RegisterDialogProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const createLead = useCreateLead();

  const form = useForm<InsertLead>({
    resolver: zodResolver(insertLeadSchema),
    defaultValues: {
      name: "",
      email: "",
      interestLevel: (defaultPlan as any) || "day_pass",
      comments: "",
    },
  });

  const onSubmit = (data: InsertLead) => {
    createLead.mutate(data, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
        toast({
          title: "Interest Registered!",
          description: "Thanks for supporting the project. We'll be in touch soon.",
        });
      },
      onError: (error) => {
        toast({
          title: "Something went wrong",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button size="lg" className="font-semibold text-lg px-8">Join Waitlist</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">Join the Waitlist</DialogTitle>
          <DialogDescription>
            Help us bring coworking to Staplehurst. No commitment required yet.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" {...form.register("name")} placeholder="Jane Doe" />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" {...form.register("email")} placeholder="jane@example.com" />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="interest">Interested In</Label>
            <Select 
              onValueChange={(val) => form.setValue("interestLevel", val as any)}
              defaultValue={form.getValues("interestLevel")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a plan" />
              </SelectTrigger>
              <SelectContent>
                {pricingPlans.map((plan) => (
                  <SelectItem key={plan.id} value={plan.id}>
                    {plan.name} ({plan.price})
                  </SelectItem>
                ))}
                <SelectItem value="other">Other / Not sure yet</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comments">Comments (Optional)</Label>
            <Textarea 
              id="comments" 
              {...form.register("comments")} 
              placeholder="What would make this perfect for you?" 
            />
          </div>

          <Button 
            type="submit" 
            className="w-full text-base py-6 mt-2"
            disabled={createLead.isPending}
          >
            {createLead.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Register Interest"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
