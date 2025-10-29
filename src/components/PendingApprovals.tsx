import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { 
  Check, 
  X, 
  UserCog, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  Users, 
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Filter,
  Search,
  MoreHorizontal
} from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "./ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import { toast } from "sonner@2.0.3";
import { cn } from "./ui/utils";

interface LeaveRequest {
  id: number;
  employee: {
    name: string;
    avatar: string;
    position: string;
    department: string;
    employeeId: string;
    isCriticalStaff: boolean;
  };
  leaveType: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  submittedDate: string;
  remainingBalance: {
    annual: number;
    sick: number;
    personal: number;
  };
  escalationReasons: string[];
  priority: "critical" | "high" | "medium" | "low";
}

const pendingRequests: LeaveRequest[] = [
  {
    id: 1,
    employee: {
      name: "Sarah Johnson",
      avatar: "SJ",
      position: "Lead Developer",
      department: "Engineering",
      employeeId: "EMP-002",
      isCriticalStaff: true,
    },
    leaveType: "Annual Leave",
    startDate: "2025-10-15",
    endDate: "2025-10-29",
    days: 15,
    reason: "Extended family vacation - booked flights and accommodation",
    submittedDate: "2025-09-10",
    remainingBalance: {
      annual: 18,
      sick: 10,
      personal: 5,
    },
    escalationReasons: [
      "Long duration (15 days)",
      "Critical staff member",
      "Overlaps with product launch"
    ],
    priority: "critical",
  },
  {
    id: 2,
    employee: {
      name: "Mike Davis",
      avatar: "MD",
      position: "Senior Manager",
      department: "Sales",
      employeeId: "EMP-003",
      isCriticalStaff: true,
    },
    leaveType: "Personal Leave",
    startDate: "2025-10-08",
    endDate: "2025-10-12",
    days: 5,
    reason: "Personal matter requiring immediate attention",
    submittedDate: "2025-09-28",
    remainingBalance: {
      annual: 12,
      sick: 8,
      personal: 2,
    },
    escalationReasons: [
      "Critical staff - Sales Manager",
      "Submitted 10+ days ago (overdue)"
    ],
    priority: "high",
  },
  {
    id: 3,
    employee: {
      name: "John Smith",
      avatar: "JS",
      position: "Software Developer",
      department: "Engineering",
      employeeId: "EMP-001",
      isCriticalStaff: false,
    },
    leaveType: "Annual Leave",
    startDate: "2025-10-20",
    endDate: "2025-10-24",
    days: 5,
    reason: "Family vacation planned months ago",
    submittedDate: "2025-10-01",
    remainingBalance: {
      annual: 8,
      sick: 10,
      personal: 5,
    },
    escalationReasons: [],
    priority: "medium",
  },
  {
    id: 4,
    employee: {
      name: "Emily Chen",
      avatar: "EC",
      position: "Marketing Specialist",
      department: "Marketing",
      employeeId: "EMP-004",
      isCriticalStaff: false,
    },
    leaveType: "Sick Leave",
    startDate: "2025-10-05",
    endDate: "2025-10-06",
    days: 2,
    reason: "Medical procedure scheduled",
    submittedDate: "2025-10-01",
    remainingBalance: {
      annual: 15,
      sick: 8,
      personal: 5,
    },
    escalationReasons: [],
    priority: "low",
  },
  {
    id: 5,
    employee: {
      name: "David Wilson",
      avatar: "DW",
      position: "HR Manager",
      department: "HR",
      employeeId: "EMP-005",
      isCriticalStaff: true,
    },
    leaveType: "Annual Leave",
    startDate: "2025-10-15",
    endDate: "2025-10-22",
    days: 8,
    reason: "Attending sister's wedding overseas",
    submittedDate: "2025-09-20",
    remainingBalance: {
      annual: 10,
      sick: 12,
      personal: 4,
    },
    escalationReasons: [
      "Critical staff - HR Manager",
      "Overlaps with other team members",
      "Submitted 15+ days ago (overdue)"
    ],
    priority: "high",
  },
  {
    id: 6,
    employee: {
      name: "Lisa Anderson",
      avatar: "LA",
      position: "Junior Designer",
      department: "Design",
      employeeId: "EMP-006",
      isCriticalStaff: false,
    },
    leaveType: "Personal Leave",
    startDate: "2025-10-11",
    endDate: "2025-10-11",
    days: 1,
    reason: "Personal appointment",
    submittedDate: "2025-10-02",
    remainingBalance: {
      annual: 20,
      sick: 10,
      personal: 4,
    },
    escalationReasons: [],
    priority: "low",
  },
];

export function PendingApprovals() {
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRequest, setExpandedRequest] = useState<number | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [delegateTo, setDelegateTo] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Separate requests into categories
  const escalationRequests = pendingRequests.filter(
    req => req.escalationReasons.length > 0
  );
  const regularRequests = pendingRequests.filter(
    req => req.escalationReasons.length === 0
  );
  const overdueRequests = pendingRequests.filter(
    req => getDaysOverdue(req.submittedDate) > 7
  );

  // Apply filters and search
  const filterRequests = (requests: LeaveRequest[]) => {
    let filtered = requests;
    
    if (filterPriority !== "all") {
      filtered = filtered.filter(req => req.priority === filterPriority);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(req => 
        req.employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.employee.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.leaveType.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  const getRequestsByTab = () => {
    switch (activeTab) {
      case "escalation":
        return filterRequests(escalationRequests);
      case "overdue":
        return filterRequests(overdueRequests);
      case "critical":
        return filterRequests(pendingRequests.filter(r => r.employee.isCriticalStaff));
      default:
        return filterRequests(pendingRequests);
    }
  };

  const handleApprove = (request: LeaveRequest) => {
    toast.success(`Approved leave request for ${request.employee.name}`, {
      description: `${request.days} days from ${new Date(request.startDate).toLocaleDateString()}`
    });
    console.log("Approving request:", request.id);
  };

  const handleReject = (request: LeaveRequest) => {
    if (!rejectReason.trim()) {
      toast.error("Please provide a reason for rejection");
      return;
    }
    toast.success(`Rejected leave request for ${request.employee.name}`);
    console.log("Rejecting request:", request.id, "Reason:", rejectReason);
    setRejectReason("");
  };

  const handleDelegate = (request: LeaveRequest) => {
    if (!delegateTo) {
      toast.error("Please select who to delegate to");
      return;
    }
    toast.success(`Delegated ${request.employee.name}'s request to ${delegateTo}`);
    console.log("Delegating request:", request.id, "To:", delegateTo);
    setDelegateTo("");
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-950/30 dark:text-red-300 dark:border-red-800";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-950/30 dark:text-orange-300 dark:border-orange-800";
      case "medium":
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800";
      case "low":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-950/30 dark:text-green-300 dark:border-green-800";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-950/30 dark:text-gray-300 dark:border-gray-800";
    }
  };

  const getLeaveTypeColor = (leaveType: string) => {
    switch (leaveType) {
      case "Annual Leave":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-300 dark:border-blue-800";
      case "Sick Leave":
        return "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/20 dark:text-red-300 dark:border-red-800";
      case "Personal Leave":
        return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/20 dark:text-purple-300 dark:border-purple-800";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950/20 dark:text-gray-300 dark:border-gray-800";
    }
  };

  const getPriorityIcon = (priority: string) => {
    if (priority === "critical" || priority === "high") {
      return <AlertTriangle className="h-3 w-3" />;
    }
    return null;
  };

  function getDaysOverdue(submittedDate: string) {
    const submitted = new Date(submittedDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - submitted.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  const toggleExpand = (id: number) => {
    setExpandedRequest(expandedRequest === id ? null : id);
  };

  const renderRequestCard = (request: LeaveRequest, isEscalation: boolean = false) => {
    const isExpanded = expandedRequest === request.id;
    const daysOverdue = getDaysOverdue(request.submittedDate);

    return (
      <Card
        key={request.id}
        className={cn(
          "transition-all duration-200 hover:shadow-md",
          isEscalation && "border-l-4 border-l-orange-500 bg-gradient-to-r from-orange-50/50 to-transparent dark:from-orange-950/20"
        )}
      >
        <CardContent className="p-6">
          {/* Header Section */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <Avatar className="h-12 w-12 flex-shrink-0 ring-2 ring-primary/10">
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-semibold">
                  {request.employee.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-lg truncate">{request.employee.name}</h3>
                  {request.employee.isCriticalStaff && (
                    <Badge variant="outline" className="bg-purple-50 border-purple-200 text-purple-700 dark:bg-purple-950/20 dark:border-purple-800 dark:text-purple-300">
                      <Users className="h-3 w-3 mr-1" />
                      Critical
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground text-sm">
                  {request.employee.position} • {request.employee.department} • {request.employee.employeeId}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 flex-shrink-0">
              {daysOverdue > 7 && (
                <Badge variant="outline" className="bg-red-50 border-red-200 text-red-700 dark:bg-red-950/20 dark:border-red-800 dark:text-red-300">
                  <Clock className="h-3 w-3 mr-1" />
                  {daysOverdue}d
                </Badge>
              )}
              <Badge variant="outline" className={cn("flex items-center gap-1 font-medium", getPriorityColor(request.priority))}>
                {getPriorityIcon(request.priority)}
                {request.priority.toUpperCase()}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleApprove(request)}>
                    <Check className="mr-2 h-4 w-4 text-green-600" />
                    Quick Approve
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toggleExpand(request.id)}>
                    <Calendar className="mr-2 h-4 w-4" />
                    View Details
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Escalation Alert */}
          {isEscalation && request.escalationReasons.length > 0 && (
            <div className="bg-orange-100 border border-orange-200 rounded-lg p-4 mb-4 dark:bg-orange-950/30 dark:border-orange-800">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-orange-900 dark:text-orange-100 mb-2">
                    Escalation Required
                  </h4>
                  <ul className="space-y-1 text-sm text-orange-800 dark:text-orange-200">
                    {request.escalationReasons.map((reason, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Leave Type</p>
              <Badge variant="outline" className={cn("text-xs font-medium", getLeaveTypeColor(request.leaveType))}>
                {request.leaveType}
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Duration</p>
              <p className="font-semibold">{request.days} day{request.days > 1 ? "s" : ""}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Start Date</p>
              <p className="font-semibold">{new Date(request.startDate).toLocaleDateString()}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Submitted</p>
              <p className="font-semibold">{new Date(request.submittedDate).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Expandable Details */}
          {isExpanded && (
            <div className="space-y-4 pt-4 border-t">
              {/* Date Range */}
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="font-medium">Leave Period</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {new Date(request.startDate).toLocaleDateString()} → {new Date(request.endDate).toLocaleDateString()}
                </p>
              </div>

              {/* Leave Balance */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 dark:bg-blue-950/20 dark:border-blue-800">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="font-medium text-blue-900 dark:text-blue-100">Remaining Balance</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{request.remainingBalance.annual}</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">Annual</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{request.remainingBalance.sick}</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">Sick</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{request.remainingBalance.personal}</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">Personal</p>
                  </div>
                </div>
              </div>

              {/* Reason */}
              <div className="space-y-2">
                <h4 className="font-medium">Reason for Leave</h4>
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-sm">{request.reason}</p>
                </div>
              </div>
            </div>
          )}

          <Separator className="my-4" />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex gap-2 flex-1">
              <Button
                size="sm"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                onClick={() => handleApprove(request)}
              >
                <Check className="mr-2 h-4 w-4" />
                Approve
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="flex-1 text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-950/20">
                    <X className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Reject Leave Request</AlertDialogTitle>
                    <AlertDialogDescription>
                      Please provide a reason for rejecting {request.employee.name}'s leave request.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <Textarea
                    placeholder="Enter reason for rejection..."
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleReject(request)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Confirm Rejection
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleExpand(request.id)}
                className="flex-shrink-0"
              >
                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                {isExpanded ? "Less" : "More"}
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="flex-shrink-0">
                    <UserCog className="mr-2 h-4 w-4" />
                    Delegate
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delegate Approval</AlertDialogTitle>
                    <AlertDialogDescription>
                      Delegate {request.employee.name}'s leave request to another manager.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <Select value={delegateTo} onValueChange={setDelegateTo}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select manager..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="senior-manager">Senior Manager</SelectItem>
                      <SelectItem value="dept-head">Department Head</SelectItem>
                      <SelectItem value="hr-director">HR Director</SelectItem>
                      <SelectItem value="ceo">CEO</SelectItem>
                    </SelectContent>
                  </Select>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelegate(request)}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Confirm Delegation
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const currentRequests = getRequestsByTab();

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/30 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">Total Pending</p>
                  <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{pendingRequests.length}</p>
                </div>
                <Clock className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/30 border-orange-200 dark:border-orange-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-600 dark:text-orange-400 text-sm font-medium">Escalation</p>
                  <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">{escalationRequests.length}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/30 border-purple-200 dark:border-purple-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 dark:text-purple-400 text-sm font-medium">Critical Staff</p>
                  <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                    {pendingRequests.filter(r => r.employee.isCriticalStaff).length}
                  </p>
                </div>
                <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/50 dark:to-red-900/30 border-red-200 dark:border-red-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-600 dark:text-red-400 text-sm font-medium">Overdue</p>
                  <p className="text-2xl font-bold text-red-900 dark:text-red-100">
                    {overdueRequests.length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex items-center gap-2 flex-1">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search employees, departments, or leave types..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabbed Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            All ({pendingRequests.length})
          </TabsTrigger>
          <TabsTrigger value="escalation" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Escalation ({escalationRequests.length})
          </TabsTrigger>
          <TabsTrigger value="overdue" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Overdue ({overdueRequests.length})
          </TabsTrigger>
          <TabsTrigger value="critical" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Critical ({pendingRequests.filter(r => r.employee.isCriticalStaff).length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          {currentRequests.length > 0 ? (
            currentRequests.map((request) => renderRequestCard(request, false))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Clock className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">No pending approvals found</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="escalation" className="space-y-4 mt-6">
          {currentRequests.length > 0 ? (
            currentRequests.map((request) => renderRequestCard(request, true))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <AlertTriangle className="mx-auto h-12 w-12 text-orange-400/50 mb-4" />
                <p className="text-muted-foreground">No escalation requests found</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="overdue" className="space-y-4 mt-6">
          {currentRequests.length > 0 ? (
            currentRequests.map((request) => renderRequestCard(request, false))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Clock className="mx-auto h-12 w-12 text-red-400/50 mb-4" />
                <p className="text-muted-foreground">No overdue requests found</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="critical" className="space-y-4 mt-6">
          {currentRequests.length > 0 ? (
            currentRequests.map((request) => renderRequestCard(request, false))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Users className="mx-auto h-12 w-12 text-purple-400/50 mb-4" />
                <p className="text-muted-foreground">No critical staff requests found</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}