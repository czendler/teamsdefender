
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30 py-10">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="md:max-w-xs">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-semibold text-lg">SecureTeams</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Enterprise-grade security solutions for Microsoft Teams, helping organizations maintain compliance with industry standards.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-medium mb-3">Solutions</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="#scanner" className="text-muted-foreground hover:text-foreground">Security Scanner</Link></li>
                <li><Link to="#policy" className="text-muted-foreground hover:text-foreground">Policy Templates</Link></li>
                <li><Link to="#" className="text-muted-foreground hover:text-foreground">Consulting Services</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="#" className="text-muted-foreground hover:text-foreground">About</Link></li>
                <li><Link to="#" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
                <li><Link to="#" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
                <li><Link to="#" className="text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border/40 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SecureTeams.com. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
