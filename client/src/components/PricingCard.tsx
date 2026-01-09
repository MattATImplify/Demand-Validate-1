import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RegisterDialog } from "./RegisterDialog";

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  frequency: string;
  description: string;
  features: string[];
}

interface PricingCardProps {
  plan: PricingPlan;
  popular?: boolean;
}

export function PricingCard({ plan, popular }: PricingCardProps) {
  return (
    <div 
      className={`
        relative flex flex-col p-8 bg-white rounded-3xl border transition-all duration-300 hover:-translate-y-1
        ${popular 
          ? 'border-primary shadow-xl shadow-primary/10 ring-1 ring-primary/5' 
          : 'border-border shadow-lg hover:shadow-xl hover:border-primary/30'}
      `}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full shadow-md">
          Most Popular
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-bold text-foreground font-display">{plan.name}</h3>
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{plan.description}</p>
      </div>

      <div className="mb-6 flex items-baseline">
        <span className="text-4xl font-bold text-foreground tracking-tight">{plan.price}</span>
        <span className="text-muted-foreground ml-2 font-medium">{plan.frequency}</span>
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start">
            <div className="mr-3 mt-1 rounded-full bg-primary/10 p-1">
              <Check className="w-3 h-3 text-primary" strokeWidth={3} />
            </div>
            <span className="text-sm text-foreground/80">{feature}</span>
          </li>
        ))}
      </ul>

      <RegisterDialog 
        defaultPlan={plan.id} 
        trigger={
          <Button 
            className={`w-full py-6 text-base ${popular ? 'bg-primary hover:bg-primary/90' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
          >
            I'm Interested
          </Button>
        }
      />
    </div>
  );
}
