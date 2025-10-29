import { Separator } from "./ui/separator";

export function Footer() {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>© 2025 Employee Leave Management System</span>
            <Separator orientation="vertical" className="h-4" />
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <Separator orientation="vertical" className="h-4" />
            <a href="#" className="hover:text-primary">Terms of Service</a>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>Need help?</span>
            <a href="mailto:hr@company.com" className="hover:text-primary">
              Contact HR Support
            </a>
            <Separator orientation="vertical" className="h-4" />
            <span>Ext: 1234</span>
          </div>
        </div>
      </div>
    </footer>
  );
}