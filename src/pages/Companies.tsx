import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { MainLayout } from '@/components/layout/MainLayout';
import { RequireRole } from '@/components/auth/RequireRole';
import { Eye, Edit, Lock, Unlock, Trash, Plus, Users, FileText, Shield, Settings, RefreshCw, Download, AlertTriangle } from 'lucide-react';

// Mock data
const mockCompanies = [
  {
    id: '1',
    name: 'Acme Corp',
    email: 'info@acme.com',
    owner: 'John Doe',
    employees: 120,
    status: 'Active',
    createdAt: '2023-01-10',
  },
  {
    id: '2',
    name: 'Beta Solutions',
    email: 'contact@beta.com',
    owner: 'Jane Smith',
    employees: 80,
    status: 'Inactive',
    createdAt: '2022-10-03',
  },
  {
    id: '3',
    name: 'Gamma LLC',
    email: 'admin@gamma.com',
    owner: 'Alice Brown',
    employees: 45,
    status: 'Active',
    createdAt: '2024-02-18',
  },
];

type Company = {
  id: string;
  name: string;
  email: string;
  owner: string;
  employees: number;
  status: 'Active' | 'Inactive';
  createdAt: string;
  complianceStatus?: 'Good' | 'Warning' | 'Missing';
  payrollHealth?: 'Healthy' | 'Issue' | 'Pending';
  invited?: boolean;
};

const mockAuditLogs = [
  { id: 1, action: 'Created company', user: 'Super Admin', date: '2024-01-01' },
  { id: 2, action: 'Added user', user: 'Super Admin', date: '2024-01-02' },
  { id: 3, action: 'Payroll run', user: 'Payroll Admin', date: '2024-02-01' },
];

// Giả lập userRole, thực tế lấy từ context/auth
const userRole = 'Super Admin'; // Hoặc 'Manager', 'Viewer'...

export default function Companies() {
  const [search, setSearch] = useState('');
  const [companies, setCompanies] = useState<Company[]>(mockCompanies.map(c => ({
    ...c,
    complianceStatus: Math.random() > 0.8 ? 'Warning' : 'Good',
    payrollHealth: Math.random() > 0.7 ? 'Issue' : 'Healthy',
    invited: Math.random() > 0.5,
  })));
  const [selectedCompany, setSelectedCompany] = useState<Company|null>(null);
  const [action, setAction] = useState<'delete'|'lock'|'unlock'|null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [newCompany, setNewCompany] = useState({ name: '', email: '', owner: '', employees: 0 });
  const [editCompany, setEditCompany] = useState<any>(null);
  // Pagination mock
  const [page, setPage] = useState(1);
  const pageSize = 5;
  // Bộ lọc nâng cao
  const [statusFilter, setStatusFilter] = useState<'All'|'Active'|'Inactive'>('All');
  const [complianceFilter, setComplianceFilter] = useState<'All'|'Good'|'Warning'|'Missing'>('All');
  const [payrollFilter, setPayrollFilter] = useState<'All'|'Healthy'|'Issue'|'Pending'>('All');

  const filtered = companies.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || c.status === statusFilter;
    const matchCompliance = complianceFilter === 'All' || c.complianceStatus === complianceFilter;
    const matchPayroll = payrollFilter === 'All' || c.payrollHealth === payrollFilter;
    return matchSearch && matchStatus && matchCompliance && matchPayroll;
  });
  const totalPages = Math.ceil(filtered.length / pageSize);
  const pagedCompanies = filtered.slice((page-1)*pageSize, page*pageSize);

  // Action handlers
  const handleAction = (company: any, act: 'delete'|'lock'|'unlock') => {
    setSelectedCompany(company);
    setAction(act);
    setShowDialog(true);
  };
  const confirmAction = () => {
    if (action === 'delete') {
      setCompanies(companies.filter(c => c.id !== selectedCompany.id));
    } else if (action === 'lock') {
      setCompanies(companies.map(c => c.id === selectedCompany.id ? { ...c, status: 'Inactive' } : c));
    } else if (action === 'unlock') {
      setCompanies(companies.map(c => c.id === selectedCompany.id ? { ...c, status: 'Active' } : c));
    }
    setShowDialog(false);
    setSelectedCompany(null);
    setAction(null);
  };
  // Add company
  const handleAddCompany = () => {
    setCompanies([
      ...companies,
      {
        ...newCompany,
        id: (Math.random()*100000).toFixed(0),
        status: 'Active',
        createdAt: new Date().toISOString().slice(0,10),
      },
    ]);
    setShowAddDialog(false);
    setNewCompany({ name: '', email: '', owner: '', employees: 0 });
  };
  // Edit company
  const handleEditCompany = () => {
    setCompanies(companies.map(c => c.id === editCompany.id ? { ...editCompany } : c));
    setShowEditDialog(false);
    setEditCompany(null);
  };

  return (
    <RequireRole allowedRoles={['Super Admin']}>
      <MainLayout>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Companies</h1>
          <div className="flex gap-2">
            {userRole === 'Super Admin' && (
              <Button className="gap-2" onClick={() => setShowAddDialog(true)} title="Add new company">
                <Plus size={18} /> Add Company
              </Button>
            )}
            <Button className="gap-2" variant="outline" onClick={() => alert('Export mock!')} title="Export all companies">
              <Download size={16}/> Export
            </Button>
            {userRole === 'Super Admin' && (
              <Button className="gap-2" variant="outline" onClick={() => { alert('Bulk lock/unlock/delete mock!'); }} title="Bulk actions">
                Bulk Actions
              </Button>
            )}
          </div>
        </div>
        {/* Alert tổng hợp nếu có công ty compliance warning hoặc payroll issue */}
        {(companies.some(c => c.complianceStatus === 'Warning' || c.payrollHealth === 'Issue')) && (
          <div className="mb-4 p-3 rounded bg-yellow-50 border border-yellow-300 text-yellow-900 flex items-center gap-2">
            <AlertTriangle size={18} className="text-yellow-600" />
            <span>
              Có {companies.filter(c => c.complianceStatus === 'Warning').length} công ty compliance warning và {companies.filter(c => c.payrollHealth === 'Issue').length} công ty payroll issue. <b>Kiểm tra ngay!</b>
            </span>
          </div>
        )}
        {/* Bộ lọc nâng cao */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Input
            placeholder="Search company name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-56"
          />
          <select className="border rounded px-2 py-1 text-sm" value={statusFilter} onChange={e => setStatusFilter(e.target.value as any)}>
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <select className="border rounded px-2 py-1 text-sm" value={complianceFilter} onChange={e => setComplianceFilter(e.target.value as any)}>
            <option value="All">All Compliance</option>
            <option value="Good">Good</option>
            <option value="Warning">Warning</option>
            <option value="Missing">Missing</option>
          </select>
          <select className="border rounded px-2 py-1 text-sm" value={payrollFilter} onChange={e => setPayrollFilter(e.target.value as any)}>
            <option value="All">All Payroll</option>
            <option value="Healthy">Healthy</option>
            <option value="Issue">Issue</option>
            <option value="Pending">Pending</option>
          </select>
        </div> 
        <div className="flex items-center gap-3 mb-4">
          <Input
            placeholder="Search company name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-64"
          />
        </div>
        <div className="overflow-x-auto rounded-lg border bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-2 py-2"><input type="checkbox" title="Select all" /></th>
                <th className="px-4 py-2 font-semibold text-left">Name</th>
                <th className="px-4 py-2 font-semibold text-left">Email</th>
                <th className="px-4 py-2 font-semibold text-left">Owner</th>
                <th className="px-4 py-2 font-semibold text-center">Employees</th>
                <th className="px-4 py-2 font-semibold text-center">Compliance</th>
                <th className="px-4 py-2 font-semibold text-center">Payroll</th>
                <th className="px-4 py-2 font-semibold text-center">Status</th>
                <th className="px-4 py-2 font-semibold text-center">Created</th>
                <th className="px-4 py-2 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pagedCompanies.length === 0 && (
                <tr>
                  <td colSpan={10} className="px-4 py-8 text-center text-muted-foreground">No companies found.</td>
                </tr>
              )}
              {pagedCompanies.map(company => (
                <tr key={company.id} className="border-b hover:bg-gray-50">
                  <td className="px-2 py-2"><input type="checkbox" title="Select row" /></td>
                  <td className="px-4 py-2 font-medium flex items-center gap-2">
                    {company.name}
                    {company.complianceStatus === 'Warning' && <AlertTriangle size={14} className="text-yellow-500" title="Compliance warning" />}
                    {company.createdAt === new Date().toISOString().slice(0,10) && <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">New</span>}
                  </td>
                  <td className="px-4 py-2">{company.email}</td>
                  <td className="px-4 py-2">{company.owner}</td>
                  <td className="px-4 py-2 text-center">{company.employees}</td>
                  <td className="px-4 py-2 text-center">
                    {company.complianceStatus === 'Good' && <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">Good</span>}
                    {company.complianceStatus === 'Warning' && <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">Warning</span>}
                    {company.complianceStatus === 'Missing' && <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs font-semibold">Missing</span>}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {company.payrollHealth === 'Healthy' && <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">Healthy</span>}
                    {company.payrollHealth === 'Issue' && <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-semibold">Issue</span>}
                    {company.payrollHealth === 'Pending' && <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">Pending</span>}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${company.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'}`}>{company.status}</span>
                  </td>
                  <td className="px-4 py-2 text-center">{company.createdAt}</td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex gap-2 justify-center">
                      <Button size="icon" variant="ghost" title="View company details" onClick={() => { setSelectedCompany(company); setShowDetailDialog(true); }}><Eye size={16}/></Button>
                      {userRole === 'Super Admin' && (
                        <>
                          <Button size="icon" variant="ghost" title="Edit company" onClick={() => { setEditCompany(company); setShowEditDialog(true); }}><Edit size={16}/></Button>
                          <Button size="icon" variant="ghost" title="Resend Invite" onClick={() => alert('Resend invite mock!')}><RefreshCw size={16}/></Button>
                          {company.status === 'Active' ? (
                            <Button size="icon" variant="ghost" title="Lock company" onClick={() => handleAction(company, 'lock')}><Lock size={16}/></Button>
                          ) : (
                            <Button size="icon" variant="ghost" title="Unlock company" onClick={() => handleAction(company, 'unlock')}><Unlock size={16}/></Button>
                          )}
                          <Button size="icon" variant="ghost" title="Delete company" onClick={() => handleAction(company, 'delete')}><Trash size={16}/></Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> 
        {/* Pagination */}
        <div className="flex justify-end items-center gap-2 mt-4">
          <Button size="sm" variant="outline" disabled={page === 1} onClick={() => setPage(page-1)}>&lt;</Button>
          <span className="text-xs">Page {page} / {totalPages || 1}</span>
          <Button size="sm" variant="outline" disabled={page === totalPages || totalPages === 0} onClick={() => setPage(page+1)}>&gt;</Button>
        </div>
        {/* Add Company Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent>
            <DialogHeader>Add New Company</DialogHeader>
            <div className="space-y-3">
              <Input placeholder="Company Name" value={newCompany.name} onChange={e => setNewCompany({ ...newCompany, name: e.target.value })} />
              <Input placeholder="Email" value={newCompany.email} onChange={e => setNewCompany({ ...newCompany, email: e.target.value })} />
              <Input placeholder="Owner" value={newCompany.owner} onChange={e => setNewCompany({ ...newCompany, owner: e.target.value })} />
              <Input type="number" placeholder="Employees" value={newCompany.employees} onChange={e => setNewCompany({ ...newCompany, employees: Number(e.target.value) })} />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
              <Button onClick={handleAddCompany}>Add</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* Edit Company Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent>
            <DialogHeader>Edit Company</DialogHeader>
            <div className="space-y-3">
              <Input placeholder="Company Name" value={editCompany?.name || ''} onChange={e => setEditCompany({ ...editCompany, name: e.target.value })} />
              <Input placeholder="Email" value={editCompany?.email || ''} onChange={e => setEditCompany({ ...editCompany, email: e.target.value })} />
              <Input placeholder="Owner" value={editCompany?.owner || ''} onChange={e => setEditCompany({ ...editCompany, owner: e.target.value })} />
              <Input type="number" placeholder="Employees" value={editCompany?.employees || 0} onChange={e => setEditCompany({ ...editCompany, employees: Number(e.target.value) })} />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowEditDialog(false)}>Cancel</Button>
              <Button onClick={handleEditCompany}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* Detail Company Dialog with Tabs */}
        <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>Company Details: <b>{selectedCompany?.name}</b></DialogHeader>
            <Tabs defaultValue="profile" className="mt-4">
              <TabsList>
                <TabsTrigger value="profile"><Shield size={16} className="mr-1"/>Profile</TabsTrigger>
                <TabsTrigger value="users"><Users size={16} className="mr-1"/>Users</TabsTrigger>
                <TabsTrigger value="payroll"><FileText size={16} className="mr-1"/>Payroll</TabsTrigger>
                <TabsTrigger value="compliance"><Lock size={16} className="mr-1"/>Compliance</TabsTrigger>
                <TabsTrigger value="audit"><FileText size={16} className="mr-1"/>Audit Logs</TabsTrigger>
                <TabsTrigger value="settings"><Settings size={16} className="mr-1"/>Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="profile">
                <div className="space-y-2 mt-2">
                  <div><b>Name:</b> {selectedCompany?.name}</div>
                  <div><b>Email:</b> {selectedCompany?.email}</div>
                  <div><b>Owner:</b> {selectedCompany?.owner}</div>
                  <div><b>Employees:</b> {selectedCompany?.employees}</div>
                  <div><b>Status:</b> {selectedCompany?.status}</div>
                  <div><b>Created:</b> {selectedCompany?.createdAt}</div>
                  <div><b>Compliance:</b> {selectedCompany?.complianceStatus}</div>
                  <div><b>Payroll Health:</b> {selectedCompany?.payrollHealth}</div>
                </div>
              </TabsContent>
              <TabsContent value="users">
                <div className="text-muted-foreground mt-2">User list (mock): 5 users...</div>
                <Button size="sm" variant="outline" className="mt-2">Export Users</Button>
              </TabsContent>
              <TabsContent value="payroll">
                <div className="text-muted-foreground mt-2">Payroll summary (mock): Last run 2025-05-01...</div>
                <Button size="sm" variant="outline" className="mt-2">Export Payroll</Button>
              </TabsContent>
              <TabsContent value="compliance">
                <div className="text-muted-foreground mt-2">Compliance status (mock):
                  {selectedCompany?.complianceStatus === 'Good' && <span className="ml-2 text-green-700">All good</span>}
                  {selectedCompany?.complianceStatus === 'Warning' && <span className="ml-2 text-yellow-700">Warning: Missing documents!</span>}
                  {selectedCompany?.complianceStatus === 'Missing' && <span className="ml-2 text-gray-700">Missing</span>}
                </div>
                <Button size="sm" variant="outline" className="mt-2">Export Compliance</Button>
              </TabsContent>
              <TabsContent value="audit">
                <div className="text-muted-foreground mt-2">Audit Logs:</div>
                <ul className="pl-4 mt-2 list-disc">
                  {mockAuditLogs.map(log => (
                    <li key={log.id}><b>{log.action}</b> by {log.user} on {log.date}</li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="settings">
                <div className="space-y-2 mt-2">
                  <Input placeholder="Company Name" value={selectedCompany?.name || ''} disabled />
                  <Input placeholder="Email" value={selectedCompany?.email || ''} disabled />
                  <Input placeholder="Owner" value={selectedCompany?.owner || ''} disabled />
                  <Input type="number" placeholder="Employees" value={selectedCompany?.employees || 0} disabled />
                  <Button size="sm" variant="outline">Reset Settings</Button>
                </div>
              </TabsContent>
            </Tabs>
            <DialogFooter>
              <Button onClick={() => setShowDetailDialog(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* Confirm Action Dialog */}
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent>
            <DialogHeader>
              {action === 'delete' && <span>Confirm delete company <b>{selectedCompany?.name}</b>?</span>}
              {action === 'lock' && <span>Lock company <b>{selectedCompany?.name}</b>?</span>}
              {action === 'unlock' && <span>Unlock company <b>{selectedCompany?.name}</b>?</span>}
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDialog(false)}>Cancel</Button>
              <Button variant={action === 'delete' ? 'destructive' : 'default'} onClick={confirmAction}>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </MainLayout>
    </RequireRole>
  );
}
