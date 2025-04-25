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
  const [domain, setDomain] = useState(() => {
    // Pobierz poprzednią wartość z localStorage, jeśli istnieje
    if (typeof window !== 'undefined') {
      return localStorage.getItem('lastDomain') || '';
    }
    return '';
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState<any | null>(null);

  const validateDomain = (domain: string) => {
    const pattern = /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
    return pattern.test(domain);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);

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

      const data = await response.json();
      console.log("ODP Backend:", data); // logowanie odpowiedzi

      if (response.ok && data.success) {
        setStatus("success");
        setResult(data);
        toast.success("Skan domeny zakończony pomyślnie");
      } else {
        setStatus("error");
        setResult(data); // zapisz odpowiedź nawet przy błędzie
        throw new Error(data.error || "Wystąpił błąd podczas skanowania");
      }
    } catch (err) {
      setStatus("error");
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === "string") {
        setError(err);
      } else {
        setError("Wystąpił nieoczekiwany błąd");
      }
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
            onChange={(e) => {
              setDomain(e.target.value);
              if (typeof window !== 'undefined') {
                localStorage.setItem('lastDomain', e.target.value);
              }
            }}
            className="pr-4 h-12 text-base"
            disabled={status === "loading"}
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
      {result && status === "success" && (
        <div className="mt-6 p-4 rounded bg-muted text-sm space-y-2">
          <div className="font-semibold text-base mb-2">Wynik skanowania domeny</div>
          <div>
            <b>Tenant:</b> <span className="text-primary font-mono">{result.tenant}</span>
          </div>
          <div>
            <b>Tenant ID:</b> <span className="font-mono">{result.tenant_id}</span>
          </div>
          <div>
            <b>Domeny:</b> <span className="font-mono">{Array.isArray(result.domains) ? result.domains.join(", ") : "-"}</span>
          </div>
          <div>
            <b>Typ przestrzeni:</b> <span>{result.federation_info?.name_space_type || "-"}</span>
          </div>
          <div>
            <b>Brand:</b> <span>{result.federation_info?.federation_brand_name || "-"}</span>
          </div>
          <div>
            <b>SharePoint:</b> <span className={result.m365_services?.sharepoint ? "text-green-600" : "text-red-600"}>{result.m365_services?.sharepoint ? "TAK" : "NIE"}</span>
          </div>
          <div>
            <b>MX:</b> <span className="font-mono">{result.m365_services?.mx_records?.join(", ")}</span>
          </div>
          <div>
            <b>TXT:</b> <span className="font-mono">{result.m365_services?.txt_records?.join(", ")}</span>
          </div>
          <div>
            <b>Autodiscover:</b> <span className="font-mono">{result.m365_services?.autodiscover || "-"}</span>
          </div>
          <div>
            <b>Teams:</b> <span className={result.communication_services?.teams ? "text-green-600" : "text-red-600"}>{result.communication_services?.teams ? "TAK" : "NIE"}</span>
          </div>
          <div>
            <b>Skype:</b> <span className={result.communication_services?.skype ? "text-green-600" : "text-red-600"}>{result.communication_services?.skype ? "TAK" : "NIE"}</span>
          </div>
          <div>
            <b>Microsoft 365:</b> <span className={result.uses_microsoft_365 ? "text-green-600" : "text-red-600"}>{result.uses_microsoft_365 ? "TAK" : "NIE"}</span>
          </div>
          <details className="mt-2">
            <summary className="cursor-pointer">Pokaż surową odpowiedź JSON</summary>
            <pre className="overflow-x-auto text-xs bg-gray-100 dark:bg-gray-900 p-2 rounded mt-2">{JSON.stringify(result, null, 2)}</pre>
          </details>
        </div>
      )}
      {status === "error" && result && (
        <details className="mt-2">
          <summary>Pokaż surową odpowiedź</summary>
          <pre className="overflow-x-auto">{JSON.stringify(result, null, 2)}</pre>
        </details>
      )}
    </form>
  );
}
