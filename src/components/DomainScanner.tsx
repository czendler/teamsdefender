
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ArrowRight, Check, AlertCircle } from "lucide-react";

type DomainScannerProps = {
  className?: string;
};

export function DomainScanner({ className = "" }: DomainScannerProps) {
  const [domain, setDomain] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  
  const validateDomain = (domain: string) => {
    const pattern = /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
    return pattern.test(domain);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!domain) {
      setError("Please enter a domain name");
      return;
    }
    
    if (!validateDomain(domain)) {
      setError("Please enter a valid domain name");
      return;
    }
    
    setStatus("loading");
    
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      // In a real app, you would send the domain to your backend
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className={`${className} w-full max-w-md mx-auto`}>
      <div className="flex flex-col sm:flex-row gap-2 items-stretch w-full">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="yourdomain.com"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="pr-4 h-12 text-base"
            disabled={status === "loading" || status === "success"}
          />
          {error && (
            <div className="absolute -bottom-6 left-0 text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {error}
            </div>
          )}
        </div>
        <Button 
          type="submit" 
          className="h-12 px-6 whitespace-nowrap"
          disabled={status === "loading" || status === "success"}
        >
          {status === "idle" && (
            <>
              Check My Domain
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
          {status === "loading" && "Processing..."}
          {status === "success" && (
            <>
              <Check className="mr-2 h-4 w-4" />
              Scan Complete
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
