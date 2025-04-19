
import { Download, FileText } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

type PolicyDownloadProps = {
  className?: string;
};

export function PolicyDownload({ className = "" }: PolicyDownloadProps) {
  return (
    <div className={`${className} flex flex-col lg:flex-row items-center gap-8 lg:gap-12`}>
      <div className="flex-1 max-w-xl">
        <h3 className="text-2xl font-semibold mb-3">
          ISO 27001 & NIST 800-171 Compliant Policy Template
        </h3>
        <p className="text-muted-foreground mb-6">
          Download our comprehensive Microsoft Teams security policy template, pre-mapped 
          to ISO 27001 and NIST 800-171 standards. Customize it to fit your organization's 
          specific needs and compliance requirements.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button className="flex gap-2">
            <Download className="h-4 w-4" />
            Download Template
          </Button>
          <Button variant="outline" className="flex gap-2">
            <FileText className="h-4 w-4" />
            Preview Template
          </Button>
        </div>
      </div>
      
      <Card className="flex-1 max-w-md w-full border border-border/40 shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col gap-3">
            <div className="h-8 bg-muted rounded w-2/3"></div>
            <div className="h-8 bg-muted rounded w-full"></div>
            <div className="h-8 bg-muted rounded w-5/6"></div>
            <div className="h-8 bg-muted rounded w-3/4"></div>
            <div className="h-1 my-3"></div>
            <div className="h-6 bg-muted rounded w-full"></div>
            <div className="h-6 bg-muted rounded w-full"></div>
            <div className="h-6 bg-muted rounded w-5/6"></div>
            <div className="h-1 my-2"></div>
            <div className="h-6 bg-muted rounded w-full"></div>
            <div className="h-6 bg-muted rounded w-3/4"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
