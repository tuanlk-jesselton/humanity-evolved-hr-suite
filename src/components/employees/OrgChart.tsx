
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Mock organizational data
const orgData = {
  id: "1",
  name: "John Smith",
  position: "CEO",
  avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  children: [
    {
      id: "2",
      name: "Sarah Chen",
      position: "CTO",
      avatar: "https://randomuser.me/api/portraits/women/21.jpg",
      children: [
        {
          id: "5",
          name: "Michael Wong",
          position: "Backend Developer",
          avatar: "https://randomuser.me/api/portraits/men/56.jpg",
          children: []
        },
        {
          id: "6",
          name: "Emily Johnson",
          position: "UX Designer",
          avatar: "https://randomuser.me/api/portraits/women/45.jpg",
          children: []
        }
      ]
    },
    {
      id: "3",
      name: "James Rodriguez",
      position: "COO",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      children: [
        {
          id: "7",
          name: "David Chen",
          position: "Finance Director",
          avatar: "https://randomuser.me/api/portraits/men/78.jpg",
          children: []
        }
      ]
    },
    {
      id: "4",
      name: "Lisa Taylor",
      position: "HR Director",
      avatar: "https://randomuser.me/api/portraits/women/67.jpg",
      children: [
        {
          id: "8",
          name: "Anna Smith",
          position: "HR Manager",
          avatar: "https://randomuser.me/api/portraits/women/81.jpg",
          children: []
        }
      ]
    }
  ]
};

interface OrgChartProps {
  className?: string;
}

export function OrgChart({ className }: OrgChartProps) {
  const [view, setView] = useState<'full' | 'compact'>('full');
  
  const renderNode = (node: typeof orgData, level = 0) => {
    return (
      <div key={node.id} className="flex flex-col items-center">
        <div className={`p-4 ${level === 0 ? 'pt-0' : ''}`}>
          <div className="flex flex-col items-center p-4 rounded-lg border bg-card w-40 shadow-sm">
            <Avatar className="h-16 w-16 mb-2">
              <AvatarImage src={node.avatar} alt={node.name} />
              <AvatarFallback>
                {node.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <p className="font-medium">{node.name}</p>
              <p className="text-sm text-muted-foreground">{node.position}</p>
            </div>
          </div>
        </div>
        
        {node.children && node.children.length > 0 && (
          <>
            <div className="w-px h-6 bg-border"></div>
            <div className="relative flex">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-40px)] h-px bg-border"></div>
              <div className="flex">
                {node.children.map((child, index) => (
                  <div key={child.id} className="flex flex-col items-center">
                    {index > 0 && <div className="w-4"></div>}
                    {renderNode(child, level + 1)}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  };
  
  const renderCompactNode = (node: typeof orgData, level = 0) => {
    return (
      <div key={node.id} className="ml-6 border-l pl-6">
        <div className="flex items-center -ml-[22px] mb-1">
          <div className="w-4 h-px bg-border"></div>
          <div className="flex items-center p-2 gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={node.avatar} alt={node.name} />
              <AvatarFallback>
                {node.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{node.name}</p>
              <p className="text-xs text-muted-foreground">{node.position}</p>
            </div>
          </div>
        </div>
        
        {node.children && node.children.length > 0 && (
          <div className="space-y-1">
            {node.children.map(child => renderCompactNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };
  
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Organizational Chart</CardTitle>
        <Select value={view} onValueChange={(v) => setView(v as 'full' | 'compact')}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="View" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full">Full View</SelectItem>
            <SelectItem value="compact">Compact</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto">
          {view === 'full' ? (
            <div className="flex justify-center min-w-[800px]">
              {renderNode(orgData)}
            </div>
          ) : (
            <div className="pt-4">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={orgData.avatar} alt={orgData.name} />
                  <AvatarFallback>
                    {orgData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{orgData.name}</p>
                  <p className="text-sm text-muted-foreground">{orgData.position}</p>
                </div>
              </div>
              <div className="space-y-1">
                {orgData.children.map(child => renderCompactNode(child))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
