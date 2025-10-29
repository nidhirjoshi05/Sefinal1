import { useState } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Footer } from "./components/Footer";
import { DashboardStats } from "./components/DashboardStats";
import { LeaveBalances } from "./components/LeaveBalances";
import { LeaveApplicationForm } from "./components/LeaveApplicationForm";
import { LeaveHistoryTable } from "./components/LeaveHistoryTable";
import { TeamCalendar } from "./components/TeamCalendar";
import { NotificationsPanel } from "./components/NotificationsPanel";
import { PendingApprovals } from "./components/PendingApprovals";
import { PunchInOut } from "./components/PunchInOut";
import { QuickTimeTracker } from "./components/QuickTimeTracker";
import { ProfilePage } from "./components/ProfilePage";
import { LeavePolicies } from "./components/LeavePolicies";
import { NotificationsPage } from "./components/NotificationsPage";
import { SettingsPage } from "./components/SettingsPage";
import { LoginPage } from "./components/LoginPage";
import { SignUpPage } from "./components/SignUpPage";
import { EmployeeDashboard } from "./components/EmployeeDashboard";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<
    "employee" | "manager" | null
  >(null);
  const [currentPage, setCurrentPage] = useState<
    "login" | "signup"
  >("login");
  const [activeSection, setActiveSection] =
    useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogin = (role: "employee" | "manager") => {
    setUserRole(role);
    setIsAuthenticated(true);
    setActiveSection("dashboard");
  };

  const handleSignUp = (role: "employee" | "manager") => {
    setUserRole(role);
    setIsAuthenticated(true);
    setActiveSection("dashboard");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setCurrentPage("login");
    setActiveSection("dashboard");
  };

  // Show authentication pages if not logged in
  if (!isAuthenticated) {
    if (currentPage === "login") {
      return (
        <LoginPage
          onLogin={handleLogin}
          onSwitchToSignUp={() => setCurrentPage("signup")}
        />
      );
    } else {
      return (
        <SignUpPage
          onSignUp={handleSignUp}
          onSwitchToLogin={() => setCurrentPage("login")}
        />
      );
    }
  }

  // Show Employee Dashboard for employees
  if (userRole === "employee") {
    return <EmployeeDashboard onLogout={handleLogout} />;
  }

  const renderMainContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <DashboardStats />
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2 space-y-6">
                <LeaveBalances />
                <LeaveApplicationForm />
              </div>
              <div className="space-y-6">
                <QuickTimeTracker />
                <NotificationsPanel />
                <PendingApprovals />
              </div>
            </div>
          </div>
        );
      case "punch-in-out":
        return (
          <div className="space-y-6">
            <h2 className="text-primary">Time Tracking</h2>
            <PunchInOut />
          </div>
        );
      case "leave-requests":
        return (
          <div className="space-y-6">
            <h2 className="text-primary">Leave Requests</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LeaveApplicationForm />
              <NotificationsPanel />
            </div>
          </div>
        );
      case "leave-history":
        return (
          <div className="space-y-6">
            <h2 className="text-primary">Leave History</h2>
            <LeaveHistoryTable />
          </div>
        );
      case "team-calendar":
        return (
          <div className="space-y-6">
            <h2 className="text-primary">Team Calendar</h2>
            <TeamCalendar />
          </div>
        );
      case "notifications":
        return <NotificationsPage />;
      case "pending-approvals":
        return (
          <div className="space-y-6">
            <h2 className="text-primary">Pending Approvals</h2>
            <PendingApprovals />
          </div>
        );

      case "policies":
        return <LeavePolicies />;
      case "profile":
        return <ProfilePage />;
      case "settings":
        return <SettingsPage />;
      default:
        return (
          <div className="space-y-6">
            <h2 className="text-primary">
              {activeSection.replace("-", " ").toUpperCase()}
            </h2>
            <div className="bg-muted rounded-lg p-8 text-center">
              <p className="text-muted-foreground">
                This section is under development
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header
        onNotificationsClick={() =>
          setActiveSection("notifications")
        }
        onProfileClick={() => setActiveSection("profile")}
        onLogout={handleLogout}
      />

      <div className="flex flex-1 relative">
        {/* Mobile sidebar overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`
          fixed lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-50 h-full
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        >
          <Sidebar
            activeItem={activeSection}
            onItemSelect={(item) => {
              setActiveSection(item);
              setIsSidebarOpen(false);
            }}
          />
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden mb-4 p-2 rounded-md bg-card border border-border"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {renderMainContent()}
          </div>
        </main>
      </div>

      <Footer />
      <Toaster />
    </div>
  );
}