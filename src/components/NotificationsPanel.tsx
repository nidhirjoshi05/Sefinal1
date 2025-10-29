import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Bell, Clock, AlertTriangle, CheckCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const notifications = [
  {
    id: 1,
    type: "pending_approval",
    title: "Leave Request Pending",
    message: "John Smith requested 3 days annual leave",
    time: "2 hours ago",
    icon: Clock,
    priority: "high",
    avatar: "JS"
  },
  {
    id: 2,
    type: "upcoming_leave",
    title: "Upcoming Leave",
    message: "Sarah Johnson's sick leave starts tomorrow",
    time: "4 hours ago",
    icon: AlertTriangle,
    priority: "medium",
    avatar: "SJ"
  },
  {
    id: 3,
    type: "approved",
    title: "Leave Approved",
    message: "Your annual leave request has been approved",
    time: "1 day ago",
    icon: CheckCircle,
    priority: "low",
    avatar: "You"
  },
];

export function NotificationsPanel() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "medium":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "low":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-primary flex items-center">
          <Bell className="mr-2 h-5 w-5" />
          Notifications
        </CardTitle>
        <Badge variant="secondary">
          {notifications.filter(n => n.priority === "high").length} urgent
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {notifications.map((notification) => {
          const Icon = notification.icon;
          return (
            <div key={notification.id} className="flex items-start space-x-3 p-3 bg-muted rounded-md hover:bg-muted/80 transition-colors">
              <Avatar className="h-8 w-8 mt-1">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {notification.avatar === "You" ? "YO" : notification.avatar}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <h4 className="text-sm truncate">{notification.title}</h4>
                  <Badge className={getPriorityColor(notification.priority)}>
                    {notification.priority}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-1">
                  {notification.message}
                </p>
                <p className="text-xs text-muted-foreground">
                  {notification.time}
                </p>
              </div>
              
              {notification.type === "pending_approval" && (
                <div className="flex space-x-1">
                  <Button size="sm" variant="outline" className="h-7 px-2">
                    View
                  </Button>
                </div>
              )}
            </div>
          );
        })}
        
        <Button variant="outline" className="w-full">
          View All Notifications
        </Button>
      </CardContent>
    </Card>
  );
}