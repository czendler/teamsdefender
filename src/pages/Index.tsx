
import { Eye, ClipboardCheck, LockKeyhole } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { DomainScanner } from "../components/DomainScanner";
import { BenefitCard } from "../components/BenefitCard";
import { HowItWorks } from "../components/HowItWorks";
import { PolicyDownload } from "../components/PolicyDownload";
import { Footer } from "../components/Footer";
import { Separator } from "../components/ui/separator";

const Index = () => {
  const benefits = [
    {
      icon: Eye,
      title: "Complete Visibility",
      description: "Gain full visibility into your Microsoft Teams security settings, federation configuration, and potential vulnerabilities."
    },
    {
      icon: ClipboardCheck,
      title: "Compliance Ready",
      description: "Ensure your Microsoft Teams environment meets compliance standards like ISO 27001, NIST 800-171, and GDPR."
    },
    {
      icon: LockKeyhole,
      title: "Federation Security",
      description: "Identify and mitigate risks in your external federation settings to prevent data leakage and unauthorized access."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              Is Your Microsoft Teams Secure?
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Run a free visibility scan based on your domain name.
            </p>
            <DomainScanner className="mt-8" />
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section id="scanner" className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <HowItWorks />
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Enhance Your Teams Security
            </h2>
            <p className="text-muted-foreground">
              Our comprehensive security solutions provide the visibility and tools you need to protect 
              your organization's conversations, data, and collaboration in Microsoft Teams.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <BenefitCard 
                key={index}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Policy Template Section */}
      <section id="policy" className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <PolicyDownload />
        </div>
      </section>
      
      {/* CTA Section */}
      <section id="contact" className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Need Advanced Security for Your Teams Environment?
            </h2>
            <p className="text-muted-foreground mb-8">
              Our team of Microsoft-certified experts can help you implement comprehensive 
              security controls and ensure compliance with industry regulations.
            </p>
            <button className="btn py-2 px-6 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
              Contact Our Security Team
            </button>
          </div>
        </div>
      </section>
      
      <Separator />
      
      <Footer />
    </div>
  );
};

export default Index;
