import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Timer, Play, Square } from "lucide-react";

export function QuickTimeTracker() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [punchInTime, setPunchInTime] = useState<Date | null>(null);

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
  };

  const handlePunchOut = () => {
    setIsLoggedIn(false);
    setPunchInTime(null);
  };

  const getWorkedHours = () => {
    if (!punchInTime) return "0:00";
    
    const now = new Date();
    const totalMinutes = (now.getTime() - punchInTime.getTime()) / (1000 * 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);
    
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary flex items-center">
          <Timer className="mr-2 h-5 w-5" />
          Quick Time Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-2xl mb-2">
            {currentTime.toLocaleTimeString()}
          </div>
          <div className="text-sm text-muted-foreground">
            {currentTime.toLocaleDateString()}
          </div>
        </div>

        <div className="text-center">
          {isLoggedIn ? (
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-sm py-2 px-4">
              Clocked In
            </Badge>
          ) : (
            <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 text-sm py-2 px-4">
              Clocked Out
            </Badge>
          )}
        </div>

        {isLoggedIn && (
          <div className="text-center text-sm text-muted-foreground">
            <p>Started: {punchInTime?.toLocaleTimeString()}</p>
            <p>Worked: {getWorkedHours()}</p>
          </div>
        )}

        <div className="flex justify-center">
          {!isLoggedIn ? (
            <Button onClick={handlePunchIn} className="flex items-center w-full">
              <Play className="mr-2 h-4 w-4" />
              Punch In
            </Button>
          ) : (
            <Button 
              onClick={handlePunchOut} 
              variant="destructive" 
              className="flex items-center w-full"
            >
              <Square className="mr-2 h-4 w-4" />
              Punch Out
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}