import { Card, CardContent } from "./ui/card";
import { Users, Calendar, Clock, Timer } from "lucide-react";

const stats = [
  {
    title: "Total Employees",
    value: "142",
    change: "+12%",
    changeType: "increase",
    icon: Users,
    color: "text-blue-600"
  },
  {
    title: "Clocked In Today",
    value: "128",
    change: "90%",
    changeType: "increase",
    icon: Timer,
    color: "text-green-600"
  },
  {
    title: "Pending Requests",
    value: "7",
    change: "+2",
    changeType: "increase",
    icon: Clock,
    color: "text-yellow-600"
  },
  {
    title: "Active Leaves",
    value: "18",
    change: "-5%",
    changeType: "decrease",
    icon: Calendar,
    color: "text-purple-600"
  }
];

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-2xl">{stat.value}</p>
                  <p className={`text-sm ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}