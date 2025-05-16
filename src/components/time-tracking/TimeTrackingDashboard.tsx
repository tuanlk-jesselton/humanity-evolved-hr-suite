
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, TrendingUp, Users } from 'lucide-react';

export function TimeTrackingDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Today's Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6h 12m</div>
            <p className="text-xs text-muted-foreground mt-1">Company avg: 7h 45m</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">27h 40m</div>
            <p className="text-xs text-muted-foreground mt-1">Goal: 40h 00m</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Team Clocked In</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14/22</div>
            <p className="text-xs text-muted-foreground mt-1">64% attendance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground mt-1">Time off requests</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Clock-in Status</CardTitle>
          <CardDescription>Current status: <span className="font-medium text-green-500">Clocked In (09:15 AM)</span></CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center">
            <div className="w-36 h-36 rounded-full border-8 border-primary flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold">6:12</div>
                <div className="text-xs text-muted-foreground">Hours Today</div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center gap-4">
            <Button variant="outline" className="w-32">
              <Clock size={16} className="mr-2" />
              Break
            </Button>
            <Button className="w-32">
              <Clock size={16} className="mr-2" />
              Clock Out
            </Button>
          </div>

          <div className="pt-4">
            <h3 className="font-medium mb-3">Today's Activity</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-muted rounded-md text-sm">
                <span>Clock In</span>
                <span className="font-medium">09:15 AM</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-muted rounded-md text-sm">
                <span>Break Start</span>
                <span className="font-medium">12:00 PM</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-muted rounded-md text-sm">
                <span>Break End</span>
                <span className="font-medium">01:00 PM</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
