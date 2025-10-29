import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { 
  Timer, 
  Play, 
  Square, 
  Coffee, 
  Clock,
  Calendar,
  MapPin
} from "lucide-react";

interface TimeEntry {
  id: number;
  date: string;
  punchIn: string;
  punchOut?: string;
  breakTime: number; // in minutes
  totalHours: string;
  status: "In Progress" | "Completed";
  location: string;
}

export function PunchInOut() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [punchInTime, setPunchInTime] = useState<Date | null>(null);
  const [breakStartTime, setBreakStartTime] = useState<Date | null>(null);
  const [totalBreakTime, setTotalBreakTime] = useState(0);

  // Mock time entries data
  const [timeEntries] = useState<TimeEntry[]>([
    {
      id: 1,
      date: "2024-12-18",
      punchIn: "09:00 AM",
      punchOut: "06:00 PM",
      breakTime: 60,
      totalHours: "8:00",
      status: "Completed",
      location: "Office"
    },
    {
      id: 2,
      date: "2024-12-17",
      punchIn: "08:45 AM",
      punchOut: "05:30 PM",
      breakTime: 45,
      totalHours: "8:00",
      status: "Completed",
      location: "Office"
    },
    {
      id: 3,
      date: "2024-12-16",
      punchIn: "09:15 AM",
      punchOut: "06:15 PM",
      breakTime: 60,
      totalHours: "8:00",
      status: "Completed",
      location: "Remote"
    },
    {
      id: 4,
      date: "2024-12-19",
      punchIn: "09:00 AM",
      punchOut: undefined,
      breakTime: 30,
      totalHours: "0:00",
      status: "In Progress",
      location: "Office"
    }
  ]);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handlePunchIn = () => {
    setIsLoggedIn(true);
    setPunchInTime(new Date());
    setTotalBreakTime(0);
  };

  const handlePunchOut = () => {
    setIsLoggedIn(false);
    setPunchInTime(null);
    setOnBreak(false);
    setBreakStartTime(null);
  };

  const handleBreakStart = () => {
    setOnBreak(true);
    setBreakStartTime(new Date());
  };

  const handleBreakEnd = () => {
    if (breakStartTime) {
      const breakDuration = (new Date().getTime() - breakStartTime.getTime()) / (1000 * 60);
      setTotalBreakTime(prev => prev + breakDuration);
    }
    setOnBreak(false);
    setBreakStartTime(null);
  };

  const getWorkedHours = () => {
    if (!punchInTime) return "0:00";
    
    const now = new Date();
    const totalMinutes = (now.getTime() - punchInTime.getTime()) / (1000 * 60) - totalBreakTime;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);
    
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Progress":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">In Progress</Badge>;
      case "Completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-primary flex items-center">
            <Timer className="mr-2 h-5 w-5" />
            Time Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Current Time */}
            <div className="text-center">
              <div className="text-3xl mb-2">
                {currentTime.toLocaleTimeString()}
              </div>
              <div className="text-sm text-muted-foreground flex items-center justify-center">
                <Calendar className="mr-1 h-4 w-4" />
                {currentTime.toLocaleDateString()}
              </div>
            </div>

            {/* Status */}
            <div className="text-center">
              <div className="mb-4">
                {isLoggedIn ? (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-lg py-2 px-4">
                    {onBreak ? "On Break" : "Clocked In"}
                  </Badge>
                ) : (
                  <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 text-lg py-2 px-4">
                    Clocked Out
                  </Badge>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                {isLoggedIn && punchInTime && (
                  <div>
                    <p>Started: {punchInTime.toLocaleTimeString()}</p>
                    <p>Worked: {getWorkedHours()}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-2">
              {!isLoggedIn ? (
                <Button onClick={handlePunchIn} className="flex items-center">
                  <Play className="mr-2 h-4 w-4" />
                  Punch In
                </Button>
              ) : (
                <>
                  <Button 
                    onClick={handlePunchOut} 
                    variant="destructive" 
                    className="flex items-center"
                  >
                    <Square className="mr-2 h-4 w-4" />
                    Punch Out
                  </Button>
                  {!onBreak ? (
                    <Button 
                      onClick={handleBreakStart} 
                      variant="outline" 
                      className="flex items-center"
                    >
                      <Coffee className="mr-2 h-4 w-4" />
                      Start Break
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleBreakEnd} 
                      variant="outline" 
                      className="flex items-center"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      End Break
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Today's Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Hours Today</p>
                <p className="text-2xl">{isLoggedIn ? getWorkedHours() : "8:00"}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Break Time</p>
                <p className="text-2xl">{Math.floor(totalBreakTime)}m</p>
              </div>
              <Coffee className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">This Week</p>
                <p className="text-2xl">32h</p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Location</p>
                <p className="text-2xl">Office</p>
              </div>
              <MapPin className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Time Tracking History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Time Tracking History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Punch In</TableHead>
                <TableHead>Punch Out</TableHead>
                <TableHead>Break Time</TableHead>
                <TableHead>Total Hours</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {timeEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.punchIn}</TableCell>
                  <TableCell>{entry.punchOut || "-"}</TableCell>
                  <TableCell>{entry.breakTime}m</TableCell>
                  <TableCell>{entry.totalHours}</TableCell>
                  <TableCell className="flex items-center">
                    <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                    {entry.location}
                  </TableCell>
                  <TableCell>{getStatusBadge(entry.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}