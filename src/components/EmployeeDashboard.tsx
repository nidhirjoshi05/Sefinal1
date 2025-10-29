import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Toaster } from "./ui/sonner";
import { 
  User, 
  Calendar, 
  Clock, 
  FileText, 
  Settings,
  LogOut,
  Construction,
  Zap
} from "lucide-react";

interface EmployeeDashboardProps {
  onLogout: () => void;
}

export function EmployeeDashboard({ onLogout }: EmployeeDashboardProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-primary rounded-lg p-2">
                <User className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-primary">Employee Portal</h1>
                <p className="text-sm text-muted-foreground">Welcome back, John Doe</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/api/placeholder/32/32" alt="Employee" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Button variant="outline" onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Coming Soon Banner */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 rounded-full p-6">
                  <Construction className="h-12 w-12 text-primary" />
                </div>
              </div>
              <h2 className="text-primary mb-4">Employee Dashboard Coming Soon</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                We're working hard to bring you a comprehensive employee dashboard with 
                all the tools you need to manage your leave requests, time tracking, and more.
              </p>
              <Badge variant="secondary" className="px-4 py-2">
                <Zap className="h-4 w-4 mr-2" />
                Under Development
              </Badge>
            </CardContent>
          </Card>

          {/* Preview Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span>Leave Requests</span>
                </CardTitle>
                <CardDescription>
                  Submit and track your leave applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Annual Leave</span>
                    <Badge variant="outline">15 days left</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Sick Leave</span>
                    <Badge variant="outline">8 days left</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Personal Leave</span>
                    <Badge variant="outline">3 days left</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-green-600" />
                  <span>Time Tracking</span>
                </CardTitle>
                <CardDescription>
                  Track your daily work hours and attendance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Today's Status</p>
                    <p className="text-lg font-semibold text-green-600">Punched In</p>
                    <p className="text-sm text-muted-foreground">Started at 9:00 AM</p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">This Week:</span>
                    <span className="font-medium">32.5 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-purple-600" />
                  <span>Documents</span>
                </CardTitle>
                <CardDescription>
                  Access company policies and forms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Employee Handbook
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Leave Policies
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Benefits Guide
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks you might want to perform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex-col space-y-2" disabled>
                  <Calendar className="h-6 w-6" />
                  <span className="text-sm">Request Leave</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2" disabled>
                  <Clock className="h-6 w-6" />
                  <span className="text-sm">Punch In/Out</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2" disabled>
                  <FileText className="h-6 w-6" />
                  <span className="text-sm">View Payslips</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2" disabled>
                  <Settings className="h-6 w-6" />
                  <span className="text-sm">Update Profile</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Feedback Section */}
          <Card>
            <CardHeader>
              <CardTitle>Help Us Build Better</CardTitle>
              <CardDescription>
                Your feedback is valuable as we develop the employee portal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" className="flex-1">
                  Share Feedback
                </Button>
                <Button variant="outline" className="flex-1">
                  Request Features
                </Button>
                <Button variant="outline" className="flex-1">
                  Report Issues
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Toaster />
    </div>
  );
}