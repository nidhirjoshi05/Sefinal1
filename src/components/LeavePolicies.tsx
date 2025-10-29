import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Calendar, 
  Clock, 
  Users, 
  FileText, 
  AlertCircle,
  CheckCircle,
  Download,
  BookOpen,
  Shield,
  Heart,
  Baby,
  Briefcase,
  Home
} from "lucide-react";

interface PolicyRule {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface LeavePolicy {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  maxDays: number;
  eligibility: string;
  carryOver: string;
  notice: string;
  approval: string;
  documentation: string[];
  rules: PolicyRule[];
}

const leavePolicies: LeavePolicy[] = [
  {
    id: "annual",
    name: "Annual Leave",
    icon: <Calendar className="h-5 w-5" />,
    color: "bg-blue-500",
    maxDays: 25,
    eligibility: "All permanent employees after 6 months of service",
    carryOver: "Maximum 5 days can be carried over to next year",
    notice: "Minimum 2 weeks advance notice required",
    approval: "Direct supervisor approval required",
    documentation: ["Leave application form", "Work handover plan"],
    rules: [
      {
        title: "Accrual Rate",
        description: "2.08 days per month (25 days annually)",
        icon: <Calendar className="h-4 w-4 text-blue-500" />
      },
      {
        title: "Blackout Periods",
        description: "No leave during fiscal year-end and peak seasons",
        icon: <AlertCircle className="h-4 w-4 text-red-500" />
      },
      {
        title: "Consecutive Leave",
        description: "Maximum 15 consecutive days without special approval",
        icon: <Clock className="h-4 w-4 text-orange-500" />
      }
    ]
  },
  {
    id: "sick",
    name: "Sick Leave",
    icon: <Heart className="h-5 w-5" />,
    color: "bg-red-500",
    maxDays: 12,
    eligibility: "All employees from first day of employment",
    carryOver: "Up to 6 days can be carried over",
    notice: "Notify supervisor within 2 hours of absence",
    approval: "Self-certification up to 3 days, medical certificate required for longer periods",
    documentation: ["Medical certificate (for 3+ days)", "Sick leave notification"],
    rules: [
      {
        title: "Medical Certificate",
        description: "Required for absences longer than 3 consecutive days",
        icon: <FileText className="h-4 w-4 text-red-500" />
      },
      {
        title: "Partial Days",
        description: "Can be taken in half-day increments",
        icon: <Clock className="h-4 w-4 text-blue-500" />
      },
      {
        title: "Family Care",
        description: "Can be used to care for immediate family members",
        icon: <Users className="h-4 w-4 text-green-500" />
      }
    ]
  },
  {
    id: "personal",
    name: "Personal Leave",
    icon: <Home className="h-5 w-5" />,
    color: "bg-green-500",
    maxDays: 5,
    eligibility: "All employees after 3 months of service",
    carryOver: "No carry-over permitted",
    notice: "Minimum 1 week advance notice",
    approval: "Direct supervisor approval required",
    documentation: ["Leave application form"],
    rules: [
      {
        title: "Usage Limit",
        description: "Maximum 2 consecutive days without special approval",
        icon: <AlertCircle className="h-4 w-4 text-orange-500" />
      },
      {
        title: "Emergency Use",
        description: "Can be used for emergency situations with retroactive approval",
        icon: <Shield className="h-4 w-4 text-red-500" />
      },
      {
        title: "Religious Observance",
        description: "Includes time for religious holidays and observances",
        icon: <BookOpen className="h-4 w-4 text-purple-500" />
      }
    ]
  },
  {
    id: "maternity",
    name: "Maternity/Paternity Leave",
    icon: <Baby className="h-5 w-5" />,
    color: "bg-purple-500",
    maxDays: 180,
    eligibility: "All employees after 12 months of service",
    carryOver: "Not applicable",
    notice: "Minimum 30 days advance notice",
    approval: "HR approval required",
    documentation: ["Medical certificate", "Birth certificate", "Maternity/Paternity leave form"],
    rules: [
      {
        title: "Maternity Leave",
        description: "Up to 26 weeks (6 months) for mothers",
        icon: <Heart className="h-4 w-4 text-pink-500" />
      },
      {
        title: "Paternity Leave",
        description: "Up to 2 weeks for fathers/partners",
        icon: <Users className="h-4 w-4 text-blue-500" />
      },
      {
        title: "Adoption Leave",
        description: "Same entitlements apply for adoptive parents",
        icon: <Baby className="h-4 w-4 text-purple-500" />
      }
    ]
  },
  {
    id: "bereavement",
    name: "Bereavement Leave",
    icon: <Heart className="h-5 w-5" />,
    color: "bg-gray-500",
    maxDays: 5,
    eligibility: "All employees from first day",
    carryOver: "Not applicable",
    notice: "As soon as practically possible",
    approval: "Direct supervisor notification",
    documentation: ["Death certificate or funeral notice"],
    rules: [
      {
        title: "Immediate Family",
        description: "Up to 5 days for spouse, children, parents, siblings",
        icon: <Users className="h-4 w-4 text-gray-600" />
      },
      {
        title: "Extended Family",
        description: "Up to 2 days for grandparents, in-laws, aunts, uncles",
        icon: <Users className="h-4 w-4 text-gray-500" />
      },
      {
        title: "Additional Time",
        description: "Additional unpaid leave may be granted at discretion",
        icon: <Clock className="h-4 w-4 text-blue-500" />
      }
    ]
  },
  {
    id: "study",
    name: "Study Leave",
    icon: <BookOpen className="h-5 w-5" />,
    color: "bg-indigo-500",
    maxDays: 10,
    eligibility: "Permanent employees after 12 months with approved study plan",
    carryOver: "Not applicable - annual allocation",
    notice: "Submit study plan 3 months in advance",
    approval: "Department head and HR approval required",
    documentation: ["Study plan", "Enrollment confirmation", "Academic schedule"],
    rules: [
      {
        title: "Approved Courses",
        description: "Must be job-related or career development focused",
        icon: <Briefcase className="h-4 w-4 text-indigo-500" />
      },
      {
        title: "Exam Leave",
        description: "Additional paid leave for final exams",
        icon: <FileText className="h-4 w-4 text-green-500" />
      },
      {
        title: "Reimbursement",
        description: "Partial tuition reimbursement available upon successful completion",
        icon: <CheckCircle className="h-4 w-4 text-green-500" />
      }
    ]
  }
];

const generalPolicies = [
  {
    title: "Leave Application Process",
    description: "All leave requests must be submitted through the ELMS portal with appropriate documentation and supervisor approval.",
    icon: <FileText className="h-4 w-4 text-blue-500" />
  },
  {
    title: "Emergency Leave",
    description: "In emergency situations, verbal notification is acceptable within 24 hours, followed by formal application.",
    icon: <AlertCircle className="h-4 w-4 text-red-500" />
  },
  {
    title: "Leave Conflicts",
    description: "Department heads will resolve conflicts when multiple employees request leave for the same period.",
    icon: <Users className="h-4 w-4 text-orange-500" />
  },
  {
    title: "Public Holidays",
    description: "Public holidays do not count against leave entitlements and are additional to annual leave allocation.",
    icon: <Calendar className="h-4 w-4 text-green-500" />
  },
  {
    title: "Leave Without Pay",
    description: "Extended unpaid leave may be granted in exceptional circumstances with management approval.",
    icon: <Clock className="h-4 w-4 text-purple-500" />
  },
  {
    title: "Return to Work",
    description: "Medical clearance required for return to work after extended sick leave (10+ consecutive days).",
    icon: <Heart className="h-4 w-4 text-red-500" />
  }
];

export function LeavePolicies() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-primary mb-2">Leave Policies & Guidelines</h2>
          <p className="text-muted-foreground">
            Comprehensive guide to company leave policies, entitlements, and procedures
          </p>
        </div>
        <Button className="w-fit">
          <Download className="mr-2 h-4 w-4" />
          Download Policy Handbook
        </Button>
      </div>

      <Tabs defaultValue="policies" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="policies" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Leave Types
          </TabsTrigger>
          <TabsTrigger value="guidelines" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            General Guidelines
          </TabsTrigger>
          <TabsTrigger value="forms" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Forms & Templates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="policies" className="space-y-6 mt-6">
          <div className="grid gap-6">
            {leavePolicies.map((policy) => (
              <Card key={policy.id} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${policy.color} text-white`}>
                        {policy.icon}
                      </div>
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {policy.name}
                        </CardTitle>
                        <p className="text-muted-foreground mt-1">
                          Maximum {policy.maxDays} days per year
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      {policy.maxDays} Days
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Policy Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <h4 className="text-muted-foreground">Eligibility</h4>
                      <p className="text-sm">{policy.eligibility}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-muted-foreground">Carry Over</h4>
                      <p className="text-sm">{policy.carryOver}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-muted-foreground">Notice Required</h4>
                      <p className="text-sm">{policy.notice}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-muted-foreground">Approval Process</h4>
                      <p className="text-sm">{policy.approval}</p>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <h4 className="text-muted-foreground">Required Documentation</h4>
                      <div className="flex flex-wrap gap-1">
                        {policy.documentation.map((doc, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {doc}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Policy Rules */}
                  <div>
                    <h4 className="mb-3 text-muted-foreground">Key Rules & Guidelines</h4>
                    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                      {policy.rules.map((rule, idx) => (
                        <div key={idx} className="flex gap-3 p-3 bg-muted/50 rounded-lg">
                          <div className="flex-shrink-0 mt-0.5">
                            {rule.icon}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm mb-1">{rule.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {rule.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="guidelines" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                General Leave Policies
              </CardTitle>
              <p className="text-muted-foreground">
                Company-wide policies that apply to all leave types
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {generalPolicies.map((policy, idx) => (
                  <div key={idx} className="flex gap-3 p-4 border rounded-lg">
                    <div className="flex-shrink-0 mt-1">
                      {policy.icon}
                    </div>
                    <div>
                      <h4 className="mb-2">{policy.title}</h4>
                      <p className="text-muted-foreground text-sm">
                        {policy.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Policy Updates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Recent Policy Updates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm">
                      <span className="text-blue-700 dark:text-blue-300">October 2025:</span> 
                      {" "}Extended paternity leave from 5 to 14 days for all employees.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm">
                      <span className="text-green-700 dark:text-green-300">September 2025:</span> 
                      {" "}Introduced study leave policy with up to 10 days annually for approved courses.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-3 bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm">
                      <span className="text-purple-700 dark:text-purple-300">August 2025:</span> 
                      {" "}Updated sick leave policy to allow family care usage for immediate family members.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forms" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Leave Application Forms */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileText className="h-4 w-4" />
                  Leave Application Forms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Annual Leave Form
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Sick Leave Form
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Maternity/Paternity Form
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Emergency Leave Form
                </Button>
              </CardContent>
            </Card>

            {/* Medical Documentation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Heart className="h-4 w-4" />
                  Medical Documentation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Medical Certificate Template
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Return to Work Form
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Fitness for Duty Form
                </Button>
              </CardContent>
            </Card>

            {/* Manager Resources */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Users className="h-4 w-4" />
                  Manager Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Approval Guidelines
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Delegation Authority Matrix
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Coverage Planning Template
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Reference */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Quick Reference Guide
              </CardTitle>
              <p className="text-muted-foreground">
                Essential information for employees and managers
              </p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Leave Type</th>
                      <th className="text-left p-3">Max Days</th>
                      <th className="text-left p-3">Notice Required</th>
                      <th className="text-left p-3">Documentation</th>
                      <th className="text-left p-3">Approval Level</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="p-3">Annual Leave</td>
                      <td className="p-3">25 days</td>
                      <td className="p-3">2 weeks</td>
                      <td className="p-3">Application form</td>
                      <td className="p-3">Supervisor</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3">Sick Leave</td>
                      <td className="p-3">12 days</td>
                      <td className="p-3">2 hours</td>
                      <td className="p-3">Medical cert (3+ days)</td>
                      <td className="p-3">Self-cert/Supervisor</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3">Personal Leave</td>
                      <td className="p-3">5 days</td>
                      <td className="p-3">1 week</td>
                      <td className="p-3">Application form</td>
                      <td className="p-3">Supervisor</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3">Maternity/Paternity</td>
                      <td className="p-3">180/14 days</td>
                      <td className="p-3">30 days</td>
                      <td className="p-3">Medical cert, birth cert</td>
                      <td className="p-3">HR</td>
                    </tr>
                    <tr>
                      <td className="p-3">Bereavement</td>
                      <td className="p-3">5 days</td>
                      <td className="p-3">ASAP</td>
                      <td className="p-3">Death certificate</td>
                      <td className="p-3">Notification only</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}