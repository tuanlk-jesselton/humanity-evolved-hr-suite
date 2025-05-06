
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

type Activity = {
  id: number;
  user: {
    name: string;
    avatar?: string;
    initials: string;
  };
  action: string;
  target?: string;
  timestamp: Date;
};

export function RecentActivity() {
  const activities: Activity[] = [
    {
      id: 1,
      user: {
        name: "Sarah Chen",
        initials: "SC",
        avatar: "https://randomuser.me/api/portraits/women/21.jpg",
      },
      action: "submitted a leave request",
      timestamp: new Date("2025-05-05T11:32:00"),
    },
    {
      id: 2,
      user: {
        name: "James Rodriguez",
        initials: "JR",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      action: "approved expense claim",
      target: "Office supplies",
      timestamp: new Date("2025-05-05T10:15:00"),
    },
    {
      id: 3,
      user: {
        name: "Emily Johnson",
        initials: "EJ",
        avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      },
      action: "updated employee profile",
      timestamp: new Date("2025-05-05T09:48:00"),
    },
    {
      id: 4,
      user: {
        name: "Michael Wong",
        initials: "MW",
        avatar: "https://randomuser.me/api/portraits/men/56.jpg",
      },
      action: "completed performance review",
      target: "Q1 2025",
      timestamp: new Date("2025-05-05T09:22:00"),
    },
    {
      id: 5,
      user: {
        name: "Lisa Taylor",
        initials: "LT",
        avatar: "https://randomuser.me/api/portraits/women/67.jpg",
      },
      action: "clocked in",
      timestamp: new Date("2025-05-05T08:02:00"),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src={activity.user.avatar} />
                <AvatarFallback>{activity.user.initials}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm">
                  <span className="font-medium">{activity.user.name}</span>{" "}
                  {activity.action}
                  {activity.target && (
                    <>
                      {" "}
                      <span className="font-medium">{activity.target}</span>
                    </>
                  )}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
