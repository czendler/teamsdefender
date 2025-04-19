
import { ArrowRight, Lock, Search, Shield } from "lucide-react";

type HowItWorksProps = {
  className?: string;
};

export function HowItWorks({ className = "" }: HowItWorksProps) {
  const steps = [
    {
      icon: Search,
      title: "Domain Analysis",
      description: "We scan your domain's public Microsoft Teams settings and federation configuration."
    },
    {
      icon: Shield,
      title: "Security Assessment",
      description: "Our engine analyzes your security posture against industry best practices."
    },
    {
      icon: Lock,
      title: "Actionable Results",
      description: "Receive a detailed report with prioritized recommendations to enhance security."
    }
  ];

  return (
    <div className={`${className} w-full`}>
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">How Our Scanner Works</h2>
        <p className="text-muted-foreground">
          Our automated scanning tool checks your Microsoft Teams domain for security vulnerabilities, 
          misconfigurations, and compliance gaps without requiring any installations or permissions.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row items-start gap-8 md:gap-4">
        {steps.map((step, index) => (
          <div key={index} className="flex-1 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <step.icon className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">{step.title}</h3>
            <p className="text-muted-foreground">{step.description}</p>
            
            {index < steps.length - 1 && (
              <ArrowRight className="hidden md:block h-6 w-6 text-muted-foreground/30 mt-6 mx-auto rotate-90 md:rotate-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
