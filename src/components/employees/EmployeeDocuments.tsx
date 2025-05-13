
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { FileText, Download, Upload, Trash } from 'lucide-react';

interface EmployeeDocumentsProps {
  employeeId?: string;
}

// Mock documents data
const employeeDocuments = {
  "EMP-001": [
    { id: 1, name: "Employment Contract", type: "application/pdf", uploadDate: "2022-03-15", uploadedBy: "HR Admin" },
    { id: 2, name: "Resume", type: "application/pdf", uploadDate: "2022-03-10", uploadedBy: "Sarah Chen" },
    { id: 3, name: "ID Card", type: "image/jpeg", uploadDate: "2022-03-12", uploadedBy: "HR Admin" },
  ],
  "EMP-002": [
    { id: 4, name: "Employment Contract", type: "application/pdf", uploadDate: "2021-06-22", uploadedBy: "HR Admin" },
    { id: 5, name: "Resume", type: "application/pdf", uploadDate: "2021-06-15", uploadedBy: "James Rodriguez" },
  ]
};

export function EmployeeDocuments({ employeeId = "EMP-001" }: EmployeeDocumentsProps) {
  const [documents, setDocuments] = useState(
    employeeDocuments[employeeId as keyof typeof employeeDocuments] || []
  );
  const [newDocument, setNewDocument] = useState<File | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewDocument(e.target.files[0]);
    }
  };
  
  const handleUpload = () => {
    if (newDocument) {
      // In a real app, this would upload the file to a server
      const newDoc = {
        id: Date.now(),
        name: newDocument.name,
        type: newDocument.type,
        uploadDate: new Date().toISOString().split('T')[0],
        uploadedBy: "Current User",
      };
      
      setDocuments([...documents, newDoc]);
      setNewDocument(null);
    }
  };
  
  const handleDelete = (docId: number) => {
    // In a real app, this would delete the file from the server
    setDocuments(documents.filter(doc => doc.id !== docId));
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Employee Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <Label htmlFor="documentUpload">Upload New Document</Label>
                <Input 
                  id="documentUpload" 
                  type="file" 
                  onChange={handleFileChange}
                />
              </div>
              <Button 
                onClick={handleUpload}
                disabled={!newDocument}
              >
                <Upload size={16} className="mr-2" />
                Upload
              </Button>
            </div>
            
            {documents.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document Name</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Uploaded By</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <FileText size={16} />
                          {doc.name}
                        </div>
                      </TableCell>
                      <TableCell>{doc.uploadDate}</TableCell>
                      <TableCell>{doc.uploadedBy}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <Download size={16} />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDelete(doc.id)}>
                            <Trash size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                No documents uploaded yet.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
