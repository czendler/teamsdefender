import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ArrowRight, Check, AlertCircle } from "lucide-react";
import { toast } from "./ui/sonner";

type DomainScannerProps = {
  className?: string;
};

type ScanResponse = {
  success: boolean;
  message?: string;
  error?: string;
};

export function DomainScanner({ className = "" }: DomainScannerProps) {
  const [domain, setDomain] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  
  const validateDomain = (domain: string) => {
    const pattern = /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
    return pattern.test(domain);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!domain) {
      setError("Proszę wprowadzić nazwę domeny");
      return;
    }
    
    if (!validateDomain(domain)) {
      setError("Proszę wprowadzić prawidłową nazwę domeny");
      return;
    }
    
    setStatus("loading");
    
    try {
      const response = await fetch('/api/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ domain }),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data: ScanResponse = await response.json();
      
      if (data.success) {
        setStatus("success");
        toast.success("Skan domeny zakończony pomyślnie");
      } else {
        throw new Error(data.error || "Wystąpił błąd podczas skanowania");
      }
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Wystąpił nieoczekiwany błąd");
      toast.error("Błąd skanowania domeny");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`${className} w-full max-w-md mx-auto`}>
      <div className="flex flex-col sm:flex-row gap-2 items-stretch w-full">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="twojadomena.com"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="pr-4 h-12 text-base"
            disabled={status === "loading"}
          />
          {error && (
            <div className="absolute -bottom-6 left-0 text-sm text-red-500 flex flex-col gap-1">
              <span className="flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {error}
              </span>
              {/* Szczegóły błędu jeśli dostępne */}
              {status === "error" && error && (
                <span className="text-xs text-muted-foreground break-all">{error}</span>
              )}
            </div>
          )}
        </div>
        <Button 
          type="submit" 
          className="h-12 px-6 whitespace-nowrap"
          disabled={status === "loading"}
        >
          {status === "idle" && (
            <>
              Sprawdź moją domenę
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
          {status === "loading" && "Przetwarzanie..."}
          {status === "success" && (
            <>
              <Check className="mr-2 h-4 w-4" />
              Skan zakończony
            </>
          )}
          {status === "error" && "Spróbuj ponownie"}
        </Button>
      </div>
    </form>
  );
}
