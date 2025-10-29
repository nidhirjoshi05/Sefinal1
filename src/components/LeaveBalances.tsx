import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";

const leaveTypes = [
  { type: "Annual Leave", used: 8, total: 25, color: "bg-blue-500" },
  { type: "Sick Leave", used: 2, total: 10, color: "bg-red-500" },
  { type: "Personal Leave", used: 1, total: 5, color: "bg-green-500" },
  { type: "Maternity/Paternity", used: 0, total: 90, color: "bg-purple-500" },
];

export function LeaveBalances() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">Leave Balances</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {leaveTypes.map((leave, index) => {
          const remaining = leave.total - leave.used;
          const percentage = (leave.used / leave.total) * 100;
          
          return (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">{leave.type}</span>
                <span className="text-sm text-muted-foreground">
                  {remaining} of {leave.total} days remaining
                </span>
              </div>
              <Progress value={percentage} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Used: {leave.used} days</span>
                <span>Available: {remaining} days</span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}