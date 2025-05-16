
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Check, Edit, FileText } from 'lucide-react';

// Sample data for demonstration
const timeEntries = [
  { 
    id: 1,
    date: '2023-05-15',
    employee: 'Sarah Chen',
    clockIn: '09:00 AM',
    clockOut: '05:30 PM',
    breakDuration: '1h 00m',
    totalHours: '7h 30m',
    status: 'Approved' 
  },
  { 
    id: 2,
    date: '2023-05-16',
    employee: 'Sarah Chen',
    clockIn: '08:45 AM',
    clockOut: '05:15 PM',
    breakDuration: '1h 00m',
    totalHours: '7h 30m',
    status: 'Approved' 
  },
  { 
    id: 3,
    date: '2023-05-17',
    employee: 'Sarah Chen',
    clockIn: '09:15 AM',
    clockOut: '06:00 PM',
    breakDuration: '1h 00m',
    totalHours: '7h 45m',
    status: 'Pending' 
  },
  { 
    id: 4,
    date: '2023-05-18',
    employee: 'Sarah Chen',
    clockIn: '09:00 AM',
    clockOut: '05:30 PM',
    breakDuration: '1h 00m',
    totalHours: '7h 30m',
    status: 'Pending' 
  },
  { 
    id: 5,
    date: '2023-05-19',
    employee: 'Sarah Chen',
    clockIn: '09:00 AM',
    clockOut: '-',
    breakDuration: '0h 00m',
    totalHours: '(In progress)',
    status: 'In Progress' 
  },
];

export function TimesheetManager() {
  const [entries, setEntries] = useState(timeEntries);
  
  const handleApprove = (id: number) => {
    setEntries(entries.map(entry => 
      entry.id === id ? {...entry, status: 'Approved'} : entry
    ));
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Weekly Timesheet</CardTitle>
              <CardDescription>May 15 - May 21, 2023</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <FileText size={16} className="mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Clock In</TableHead>
                <TableHead>Clock Out</TableHead>
                <TableHead>Break</TableHead>
                <TableHead>Total Hours</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">{entry.date}</TableCell>
                  <TableCell>{entry.clockIn}</TableCell>
                  <TableCell>{entry.clockOut}</TableCell>
                  <TableCell>{entry.breakDuration}</TableCell>
                  <TableCell>{entry.totalHours}</TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      entry.status === 'Approved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                      entry.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                    }`}>
                      {entry.status}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={entry.status !== 'Pending'}
                        onClick={() => handleApprove(entry.id)}
                      >
                        <Check size={16} />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Submit Manual Time Entry</CardTitle>
          <CardDescription>Use this form to log hours manually if you forgot to clock in/out</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Form for manual time entry would go here in a real implementation.
          </p>
          <Button disabled>Submit Manual Entry</Button>
        </CardContent>
      </Card>
    </div>
  );
}
