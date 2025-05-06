
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Clock, Calendar, FileText } from "lucide-react";

export function DashboardStats() {
  const stats = [
    {
      title: "Total Employees",
      value: "287",
      change: "+12",
      icon: Users,
      color: "text-primary",
    },
    {
      title: "Pending Leave Requests",
      value: "24",
      change: "+5",
      icon: Calendar,
      color: "text-orange-500",
    },
    {
      title: "Pending Approvals",
      value: "18",
      change: "+3",
      icon: FileText,
      color: "text-yellow-500",
    },
    {
      title: "Attendance Today",
      value: "93%",
      change: "+2%",
      icon: Clock,
      color: "text-green-500",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon size={18} className={stat.color} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500 font-medium">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
