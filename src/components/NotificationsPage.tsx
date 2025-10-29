import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Switch } from "./ui/switch";
import { 
  Bell, 
  Check, 
  X, 
  Calendar, 
  Clock, 
  Users, 
  AlertCircle,
  CheckCircle,
  XCircle,
  Info,
  Settings,
  Trash2,
  Mail,
  Filter,
  Search
} from "lucide-react";
import { Input } from "./ui/input";

interface Notification {
  id: string;
  type: "approval" | "rejection" | "reminder" | "system" | "update" | "alert";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: "high" | "medium" | "low";
  category: "leave" | "timesheet" | "system" | "policy";
  actionRequired?: boolean;
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "approval",
    title: "Leave Request Approved",
    message: "Your annual leave request from Dec 20-24, 2024 has been approved by Sarah Johnson.",
    timestamp: "2 minutes ago",
    isRead: false,
    priority: "high",
    category: "leave",
    actionRequired: false
  },
  {
    id: "2",
    type: "reminder",
    title: "Timesheet Submission Due",
    message: "Please submit your timesheet for the week ending December 15, 2024. Due in 2 hours.",
    timestamp: "1 hour ago",
    isRead: false,
    priority: "high",
    category: "timesheet",
    actionRequired: true
  },
  {
    id: "3",
    type: "system",
    title: "System Maintenance Scheduled",
    message: "The ELMS system will be under maintenance on Saturday, Dec 16 from 2:00 AM - 4:00 AM EST.",
    timestamp: "3 hours ago",
    isRead: false,
    priority: "medium",
    category: "system"
  },
  {
    id: "4",
    type: "rejection",
    title: "Leave Request Declined",
    message: "Your sick leave request for Dec 18, 2024 was declined. Please contact HR for more information.",
    timestamp: "1 day ago",
    isRead: true,
    priority: "high",
    category: "leave",
    actionRequired: true
  },
  {
    id: "5",
    type: "update",
    title: "New Leave Policy Available",
    message: "Updated parental leave policy is now available. Please review the new guidelines in the policies section.",
    timestamp: "2 days ago",
    isRead: true,
    priority: "medium",
    category: "policy"
  },
  {
    id: "6",
    type: "alert",
    title: "Leave Balance Low",
    message: "Your annual leave balance is running low (2 days remaining). Consider planning your leave usage carefully.",
    timestamp: "3 days ago",
    isRead: false,
    priority: "medium",
    category: "leave"
  },
  {
    id: "7",
    type: "approval",
    title: "Overtime Request Approved",
    message: "Your overtime request for December 14, 2024 (4 hours) has been approved by Mike Chen.",
    timestamp: "1 week ago",
    isRead: true,
    priority: "medium",
    category: "timesheet"
  },
  {
    id: "8",
    type: "system",
    title: "Password Expiry Reminder",
    message: "Your password will expire in 7 days. Please update your password in the settings section.",
    timestamp: "1 week ago",
    isRead: false,
    priority: "medium",
    category: "system"
  }
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "approval":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "rejection":
      return <XCircle className="h-4 w-4 text-red-500" />;
    case "reminder":
      return <Clock className="h-4 w-4 text-orange-500" />;
    case "system":
      return <Settings className="h-4 w-4 text-blue-500" />;
    case "update":
      return <Info className="h-4 w-4 text-blue-500" />;
    case "alert":
      return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    default:
      return <Bell className="h-4 w-4 text-gray-500" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-500";
    case "medium":
      return "bg-yellow-500";
    case "low":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};

const getCategoryBadge = (category: string) => {
  const colors = {
    leave: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    timesheet: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    system: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    policy: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
  };
  return colors[category as keyof typeof colors] || colors.system;
};

export function NotificationsPage() {
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationsList, setNotificationsList] = useState(notifications);

  const unreadCount = notificationsList.filter(n => !n.isRead).length;
  const highPriorityCount = notificationsList.filter(n => n.priority === "high" && !n.isRead).length;

  const filteredNotifications = notificationsList.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    switch (selectedTab) {
      case "unread":
        return !notification.isRead && matchesSearch;
      case "action":
        return notification.actionRequired && matchesSearch;
      case "leave":
        return notification.category === "leave" && matchesSearch;
      case "system":
        return notification.category === "system" && matchesSearch;
      default:
        return matchesSearch;
    }
  });

  const markAsRead = (id: string) => {
    setNotificationsList(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotificationsList(prev => 
      prev.map(n => ({ ...n, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotificationsList(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-primary mb-2 flex items-center gap-2">
            <Bell className="h-6 w-6" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </h2>
          <p className="text-muted-foreground">
            Stay updated with your leave requests, approvals, and system notifications
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
            <Check className="mr-2 h-4 w-4" />
            Mark All Read
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Preferences
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Bell className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Total</p>
                <p>{notificationsList.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                <Mail className="h-4 w-4 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Unread</p>
                <p>{unreadCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">High Priority</p>
                <p>{highPriorityCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <Clock className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Action Required</p>
                <p>{notificationsList.filter(n => n.actionRequired).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
              <TabsTrigger value="action">Action Required</TabsTrigger>
              <TabsTrigger value="leave">Leave</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-0">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No notifications found</p>
                <p className="text-sm mt-1">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              filteredNotifications.map((notification, index) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors ${
                    !notification.isRead ? "bg-blue-50/50 dark:bg-blue-950/20" : ""
                  }`}
                >
                  <div className="flex gap-3">
                    {/* Priority Indicator */}
                    <div className={`w-1 rounded-full ${getPriorityColor(notification.priority)} flex-shrink-0`} />
                    
                    {/* Icon */}
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <h4 className={`${!notification.isRead ? "font-medium" : ""}`}>
                            {notification.title}
                          </h4>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-primary rounded-full" />
                          )}
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <Badge
                            variant="secondary"
                            className={getCategoryBadge(notification.category)}
                          >
                            {notification.category}
                          </Badge>
                          {notification.actionRequired && (
                            <Badge variant="outline" className="text-orange-600 border-orange-600">
                              Action Required
                            </Badge>
                          )}
                        </div>
                      </div>

                      <p className="text-muted-foreground text-sm mb-3">
                        {notification.message}
                      </p>

                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          {notification.timestamp}
                        </p>

                        <div className="flex gap-2">
                          {!notification.isRead && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <p className="text-muted-foreground">
            Configure your notification settings and preferences
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <h4>Leave Management Notifications</h4>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">Leave Request Approvals</p>
                  <p className="text-xs text-muted-foreground">Get notified when leave requests are approved</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">Leave Request Rejections</p>
                  <p className="text-xs text-muted-foreground">Get notified when leave requests are declined</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">Leave Balance Alerts</p>
                  <p className="text-xs text-muted-foreground">Alert when leave balance is low</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">Leave Reminders</p>
                  <p className="text-xs text-muted-foreground">Remind about upcoming leave</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>

            <div className="space-y-4">
              <h4>System Notifications</h4>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">System Maintenance</p>
                  <p className="text-xs text-muted-foreground">Notifications about system downtime</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">Policy Updates</p>
                  <p className="text-xs text-muted-foreground">Updates to company policies</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">Timesheet Reminders</p>
                  <p className="text-xs text-muted-foreground">Reminders for timesheet submission</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">Email Notifications</p>
                  <p className="text-xs text-muted-foreground">Send notifications to email</p>
                </div>
                <Switch />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <Button>Save Preferences</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}