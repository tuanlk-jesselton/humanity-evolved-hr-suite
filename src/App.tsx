
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import LoginPage from "./components/auth/LoginPage";
import Register from "./pages/Register";
import CompanySetup from "./pages/CompanySetup";
import Employees from "./pages/Employees";
import EmployeeProfile from "./pages/EmployeeProfile";
import OrgChartPage from "./pages/OrgChart";
import Payroll from "./pages/Payroll";
import Leave from "./pages/Leave";
import Attendance from "./pages/Attendance";
import Claims from "./pages/Claims";
import Performance from "./pages/Performance";
import Onboarding from "./pages/Onboarding";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import TimeTracking from "./pages/TimeTracking";
import Benefits from "./pages/Benefits";
import Documents from "./pages/Documents";
import Reports from "./pages/Reports";
import Company from "./pages/Company";
import Companies from "./pages/Companies";
import Compliance from "./pages/Compliance";
import SuperAdmin from "./pages/SuperAdmin";
import CompanyAdmin from "./pages/CompanyAdmin";
import ManagerDashboardPage from "./pages/ManagerDashboard";
import EmployeeDashboardPage from "./pages/EmployeeDashboard";
import UserManagement from "./pages/UserManagement";
import SystemSettings from "./pages/SystemSettings";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => {
  // Move providers here to ensure they're only mounted once
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            
            {/* Role-specific Dashboards */}
            <Route path="/super-admin" element={
              <ProtectedRoute allowedRoles={['Super Admin']}>
                <SuperAdmin />
              </ProtectedRoute>
            } />
            
            <Route path="/company-admin" element={
              <ProtectedRoute allowedRoles={['Company Admin']}>
                <CompanyAdmin />
              </ProtectedRoute>
            } />
            
            <Route path="/manager-dashboard" element={
              <ProtectedRoute allowedRoles={['Manager']}>
                <ManagerDashboardPage />
              </ProtectedRoute>
            } />
            
            <Route path="/employee-dashboard" element={
              <ProtectedRoute allowedRoles={['Employee']}>
                <EmployeeDashboardPage />
              </ProtectedRoute>
            } />
            
            {/* Setup Routes */}
            <Route path="/company-setup" element={
              <ProtectedRoute allowedRoles={['Super Admin', 'Company Admin']}>
                <CompanySetup />
              </ProtectedRoute>
            } />
            
            {/* Admin Routes */}
            <Route path="/user-management" element={
              <ProtectedRoute allowedRoles={['Super Admin', 'Company Admin']}>
                <UserManagement />
              </ProtectedRoute>
            } />
            
            <Route path="/system-settings" element={
              <ProtectedRoute allowedRoles={['Super Admin']}>
                <SystemSettings />
              </ProtectedRoute>
            } />
            
            {/* Common App Routes Protected By Authentication */}
            <Route element={<ProtectedRoute allowedRoles={['Super Admin', 'Company Admin', 'Manager', 'Employee']} />}>
              <Route path="/" element={<Index />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/employees/:id" element={<EmployeeProfile />} />
              <Route path="/org-chart" element={<OrgChartPage />} />
              <Route path="/payroll" element={<Payroll />} />
              <Route path="/leave" element={<Leave />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/claims" element={<Claims />} />
              <Route path="/performance" element={<Performance />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
              
              {/* Additional Routes */}
              <Route path="/time-tracking" element={<TimeTracking />} />
              <Route path="/benefits" element={<Benefits />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/company" element={<Company />} />
              <Route path="/compliance" element={<Compliance />} />
            </Route>
            
            {/* Default route redirect */}
            <Route index element={<Navigate to="/login" replace />} />
            
            {/* Catch-all for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
  );
};

export default App;
