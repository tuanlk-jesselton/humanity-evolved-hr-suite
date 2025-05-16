
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
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
import Compliance from "./pages/Compliance";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/company-setup" element={<CompanySetup />} />
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
          
          {/* Gusto-like routes */}
          <Route path="/time-tracking" element={<TimeTracking />} />
          <Route path="/benefits" element={<Benefits />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/company" element={<Company />} />
          <Route path="/compliance" element={<Compliance />} />
          
          {/* Catch-all for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
