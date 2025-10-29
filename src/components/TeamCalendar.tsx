import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Filter, Users } from "lucide-react";
import { cn } from "./ui/utils";

// Leave Types with colors
const leaveTypes = {
  annual: { label: "Annual Leave", color: "bg-blue-500", textColor: "text-blue-500" },
  sick: { label: "Sick Leave", color: "bg-red-500", textColor: "text-red-500" },
  personal: { label: "Personal Leave", color: "bg-purple-500", textColor: "text-purple-500" },
  casual: { label: "Casual Leave", color: "bg-green-500", textColor: "text-green-500" },
  maternity: { label: "Maternity Leave", color: "bg-pink-500", textColor: "text-pink-500" },
  paternity: { label: "Paternity Leave", color: "bg-indigo-500", textColor: "text-indigo-500" },
};

// Mock data for team leaves
const teamLeaveData = [
  {
    id: 1,
    employee: "John Smith",
    employeeId: "EMP-001",
    department: "Engineering",
    team: "Frontend",
    leaveType: "annual" as keyof typeof leaveTypes,
    startDate: new Date(2025, 9, 2),
    endDate: new Date(2025, 9, 4),
    status: "approved",
  },
  {
    id: 2,
    employee: "Sarah Johnson",
    employeeId: "EMP-002",
    department: "Engineering",
    team: "Backend",
    leaveType: "sick" as keyof typeof leaveTypes,
    startDate: new Date(2025, 9, 5),
    endDate: new Date(2025, 9, 5),
    status: "approved",
  },
  {
    id: 3,
    employee: "Mike Davis",
    employeeId: "EMP-003",
    department: "Marketing",
    team: "Content",
    leaveType: "personal" as keyof typeof leaveTypes,
    startDate: new Date(2025, 9, 8),
    endDate: new Date(2025, 9, 10),
    status: "approved",
  },
  {
    id: 4,
    employee: "Emily Chen",
    employeeId: "EMP-004",
    department: "Engineering",
    team: "Frontend",
    leaveType: "casual" as keyof typeof leaveTypes,
    startDate: new Date(2025, 9, 15),
    endDate: new Date(2025, 9, 16),
    status: "approved",
  },
  {
    id: 5,
    employee: "David Wilson",
    employeeId: "EMP-005",
    department: "HR",
    team: "Recruitment",
    leaveType: "annual" as keyof typeof leaveTypes,
    startDate: new Date(2025, 9, 20),
    endDate: new Date(2025, 9, 24),
    status: "approved",
  },
  {
    id: 6,
    employee: "Lisa Anderson",
    employeeId: "EMP-006",
    department: "Engineering",
    team: "Backend",
    leaveType: "sick" as keyof typeof leaveTypes,
    startDate: new Date(2025, 9, 8),
    endDate: new Date(2025, 9, 9),
    status: "approved",
  },
  {
    id: 7,
    employee: "Tom Brown",
    employeeId: "EMP-007",
    department: "Sales",
    team: "Enterprise",
    leaveType: "personal" as keyof typeof leaveTypes,
    startDate: new Date(2025, 9, 28),
    endDate: new Date(2025, 9, 30),
    status: "approved",
  },
];

// Public holidays
const publicHolidays = [
  { date: new Date(2025, 9, 12), name: "Columbus Day" },
  { date: new Date(2025, 9, 31), name: "Halloween" },
];

export function TeamCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 1)); // October 2025
  const [viewMode, setViewMode] = useState<"month" | "week">("month");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [selectedTeam, setSelectedTeam] = useState<string>("all");
  const [selectedEmployee, setSelectedEmployee] = useState<string>("all");

  // Get unique departments and teams
  const departments = Array.from(new Set(teamLeaveData.map(l => l.department)));
  const teams = Array.from(new Set(teamLeaveData.map(l => l.team)));
  const employees = teamLeaveData.map(l => ({ id: l.employeeId, name: l.employee }));

  // Filter leaves based on selections
  const filteredLeaves = teamLeaveData.filter(leave => {
    if (selectedDepartment !== "all" && leave.department !== selectedDepartment) return false;
    if (selectedTeam !== "all" && leave.team !== selectedTeam) return false;
    if (selectedEmployee !== "all" && leave.employeeId !== selectedEmployee) return false;
    return true;
  });

  // Navigation
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Check if date is in leave range
  const isDateInRange = (date: Date, startDate: Date, endDate: Date) => {
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const s = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const e = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
    return d >= s && d <= e;
  };

  // Get leaves for a specific date
  const getLeavesForDate = (date: Date) => {
    return filteredLeaves.filter(leave => 
      isDateInRange(date, leave.startDate, leave.endDate)
    );
  };

  // Check if date is a public holiday
  const getPublicHoliday = (date: Date) => {
    return publicHolidays.find(holiday => 
      holiday.date.toDateString() === date.toDateString()
    );
  };

  // Generate calendar days for month view
  const generateMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days = [];

    // Add empty cells for days before the first day of month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  // Generate week days
  const generateWeekDays = () => {
    const days = [];
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }

    return days;
  };

  const monthDays = viewMode === "month" ? generateMonthDays() : [];
  const weekDays = viewMode === "week" ? generateWeekDays() : [];
  const today = new Date();

  return (
    <div className="space-y-4">
      {/* Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* View Toggle and Navigation */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1 border rounded-lg p-1">
                <Button
                  variant={viewMode === "month" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("month")}
                  className="h-8"
                >
                  Month
                </Button>
                <Button
                  variant={viewMode === "week" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("week")}
                  className="h-8"
                >
                  Week
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={viewMode === "month" ? goToPreviousMonth : goToPreviousWeek}
                  className="h-8 w-8"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={goToToday} className="h-8">
                  Today
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={viewMode === "month" ? goToNextMonth : goToNextWeek}
                  className="h-8 w-8"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">
                  {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </span>
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="h-4 w-4 text-muted-foreground hidden sm:block" />
              
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-[140px] h-8">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                <SelectTrigger className="w-[120px] h-8">
                  <SelectValue placeholder="Team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Teams</SelectItem>
                  {teams.map(team => (
                    <SelectItem key={team} value={team}>{team}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                <SelectTrigger className="w-[140px] h-8">
                  <SelectValue placeholder="Employee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Employees</SelectItem>
                  {employees.map(emp => (
                    <SelectItem key={emp.id} value={emp.id}>{emp.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar View */}
      <Card>
        <CardContent className="pt-6">
          {viewMode === "month" ? (
            <div className="space-y-4">
              {/* Month View Header */}
              <div className="grid grid-cols-7 gap-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                  <div key={day} className="text-center text-muted-foreground p-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Month View Grid */}
              <div className="grid grid-cols-7 gap-2">
                {monthDays.map((day, index) => {
                  if (!day) {
                    return <div key={`empty-${index}`} className="min-h-[100px] border border-transparent" />;
                  }

                  const leaves = getLeavesForDate(day);
                  const holiday = getPublicHoliday(day);
                  const isToday = day.toDateString() === today.toDateString();

                  return (
                    <TooltipProvider key={index}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className={cn(
                              "min-h-[100px] border rounded-lg p-2 cursor-pointer hover:border-primary transition-colors",
                              holiday && "bg-amber-50 dark:bg-amber-950/20",
                              isToday && "border-primary border-2"
                            )}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className={cn(
                                "text-sm",
                                isToday && "bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center"
                              )}>
                                {day.getDate()}
                              </span>
                              {leaves.length > 0 && (
                                <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                                  {leaves.length}
                                </Badge>
                              )}
                            </div>

                            {holiday && (
                              <div className="mb-1">
                                <Badge variant="outline" className="text-xs bg-amber-100 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300">
                                  {holiday.name}
                                </Badge>
                              </div>
                            )}

                            <div className="space-y-1">
                              {leaves.slice(0, 2).map((leave, idx) => (
                                <div
                                  key={idx}
                                  className={cn(
                                    "text-xs p-1 rounded truncate text-white",
                                    leaveTypes[leave.leaveType].color
                                  )}
                                >
                                  {leave.employee.split(" ")[0]}
                                </div>
                              ))}
                              {leaves.length > 2 && (
                                <div className="text-xs text-muted-foreground">
                                  +{leaves.length - 2} more
                                </div>
                              )}
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <div className="space-y-2">
                            <p>{day.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</p>
                            {holiday && (
                              <p className="text-amber-600 dark:text-amber-400">🎉 {holiday.name}</p>
                            )}
                            {leaves.length > 0 ? (
                              <div className="space-y-1">
                                {leaves.map((leave, idx) => (
                                  <div key={idx} className="text-xs">
                                    <p>{leave.employee}</p>
                                    <p className="text-muted-foreground">
                                      {leaveTypes[leave.leaveType].label} - {leave.department}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-muted-foreground text-xs">No leaves scheduled</p>
                            )}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  );
                })}
              </div>
            </div>
          ) : (
            // Week View
            <div className="space-y-4">
              <div className="grid grid-cols-7 gap-2">
                {weekDays.map((day, index) => {
                  const leaves = getLeavesForDate(day);
                  const holiday = getPublicHoliday(day);
                  const isToday = day.toDateString() === today.toDateString();

                  return (
                    <TooltipProvider key={index}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className={cn(
                              "border rounded-lg p-4 min-h-[200px] cursor-pointer hover:border-primary transition-colors",
                              holiday && "bg-amber-50 dark:bg-amber-950/20",
                              isToday && "border-primary border-2"
                            )}
                          >
                            <div className="text-center mb-4">
                              <div className="text-xs text-muted-foreground">
                                {day.toLocaleDateString("en-US", { weekday: "short" })}
                              </div>
                              <div className={cn(
                                "text-xl mt-1",
                                isToday && "bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center mx-auto"
                              )}>
                                {day.getDate()}
                              </div>
                            </div>

                            {holiday && (
                              <div className="mb-2">
                                <Badge variant="outline" className="w-full justify-center text-xs bg-amber-100 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300">
                                  {holiday.name}
                                </Badge>
                              </div>
                            )}

                            <div className="space-y-2">
                              {leaves.map((leave, idx) => (
                                <div
                                  key={idx}
                                  className={cn(
                                    "p-2 rounded text-white",
                                    leaveTypes[leave.leaveType].color
                                  )}
                                >
                                  <div className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6">
                                      <AvatarFallback className="text-xs bg-white/20">
                                        {leave.employee.split(" ").map(n => n[0]).join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="text-xs flex-1 min-w-0">
                                      <div className="truncate">{leave.employee}</div>
                                      <div className="text-white/80 text-[10px]">
                                        {leaveTypes[leave.leaveType].label}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <div className="space-y-2">
                            <p>{day.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</p>
                            {holiday && (
                              <p className="text-amber-600 dark:text-amber-400">🎉 {holiday.name}</p>
                            )}
                            {leaves.length > 0 ? (
                              <div className="space-y-2">
                                {leaves.map((leave, idx) => (
                                  <div key={idx} className="text-xs border-t pt-2">
                                    <p>{leave.employee}</p>
                                    <p className="text-muted-foreground">
                                      {leaveTypes[leave.leaveType].label}
                                    </p>
                                    <p className="text-muted-foreground">
                                      {leave.department} - {leave.team}
                                    </p>
                                    <p className="text-muted-foreground">
                                      {leave.startDate.toLocaleDateString()} - {leave.endDate.toLocaleDateString()}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-muted-foreground text-xs">No leaves scheduled</p>
                            )}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Leave Types Legend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(leaveTypes).map(([key, type]) => (
              <div key={key} className="flex items-center gap-2">
                <div className={cn("w-4 h-4 rounded", type.color)} />
                <span className="text-sm">{type.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700" />
              <span className="text-sm">Public Holiday</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-2 border-primary" />
              <span className="text-sm">Today</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Total Leaves This Month</p>
                <p className="text-2xl mt-1">{filteredLeaves.length}</p>
              </div>
              <CalendarIcon className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Employees on Leave Today</p>
                <p className="text-2xl mt-1">
                  {getLeavesForDate(new Date()).length}
                </p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Overlapping Leaves</p>
                <p className="text-2xl mt-1">
                  {monthDays.filter(day => day && getLeavesForDate(day).length > 1).length}
                </p>
              </div>
              <Badge className="h-8 px-3 bg-amber-500">
                Alert
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}