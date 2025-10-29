import { 
  LayoutDashboard, 
  Calendar, 
  History, 
  Users, 
  FileText,
  User,
  Clock,
  Timer,
  Settings
} from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "./ui/utils";

interface SidebarProps {
  activeItem: string;
  onItemSelect: (item: string) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "punch-in-out", label: "Punch In/Out", icon: Timer },
  { id: "leave-requests", label: "Leave Requests", icon: Calendar },
  { id: "leave-history", label: "Leave History", icon: History },
  { id: "team-calendar", label: "Team Calendar", icon: Users },
  { id: "pending-approvals", label: "Pending Approvals", icon: Clock },
  { id: "policies", label: "Leave Policies", icon: FileText },
  { id: "profile", label: "Profile", icon: User },
  { id: "settings", label: "Settings", icon: Settings },
];

export function Sidebar({ activeItem, onItemSelect }: SidebarProps) {
  return (
    <aside className="w-64 bg-card border-r border-border h-full">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeItem === item.id ? "default" : "ghost"}
              className={cn(
                "w-full justify-start",
                activeItem === item.id 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => onItemSelect(item.id)}
            >
              <Icon className="mr-3 h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
      </nav>
    </aside>
  );
}