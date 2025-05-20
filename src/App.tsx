
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Provider } from 'react-redux';
import { store } from './store';
import { QueryClientProvider } from './lib/QueryClientProvider';
import Login from './pages/Login';
import Register from './pages/Register';
import SuperAdmin from './pages/SuperAdmin';
import CompanyAdmin from './pages/CompanyAdmin';
import ManagerDashboard from './pages/ManagerDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import NotFound from './pages/NotFound';
import { ThemeProvider } from './components/ui/theme-provider';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Import other pages as you create them
import UserManagement from './pages/UserManagement';
import Employees from './pages/Employees';
import EmployeeProfile from './pages/EmployeeProfile';
import Payroll from './pages/Payroll';
import Leave from './pages/Leave';
import Claims from './pages/Claims';
import Performance from './pages/Performance';
import TimeTracking from './pages/TimeTracking';
import Settings from './pages/Settings';

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider>
        <ThemeProvider defaultTheme="system" storageKey="hrm-theme">
          <AuthProvider>
            <Router>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Super Admin routes */}
                <Route 
                  path="/super-admin/*" 
                  element={
                    <ProtectedRoute allowedRoles={['Super Admin']}>
                      <SuperAdmin />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Company Admin routes */}
                <Route 
                  path="/company-admin/*" 
                  element={
                    <ProtectedRoute allowedRoles={['Company Admin']}>
                      <CompanyAdmin />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Manager routes */}
                <Route 
                  path="/manager-dashboard/*" 
                  element={
                    <ProtectedRoute allowedRoles={['Manager']}>
                      <ManagerDashboard />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Employee routes */}
                <Route 
                  path="/employee-dashboard/*" 
                  element={
                    <ProtectedRoute allowedRoles={['Employee']}>
                      <EmployeeDashboard />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Core feature routes - protected */}
                <Route 
                  path="/users/*" 
                  element={
                    <ProtectedRoute allowedRoles={['Super Admin', 'Company Admin']}>
                      <UserManagement />
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/employees/*" 
                  element={
                    <ProtectedRoute allowedRoles={['Super Admin', 'Company Admin', 'Manager']}>
                      <Employees />
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/employee/:id/*" 
                  element={
                    <ProtectedRoute allowedRoles={['Super Admin', 'Company Admin', 'Manager', 'Employee']}>
                      <EmployeeProfile />
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/payroll/*" 
                  element={
                    <ProtectedRoute allowedRoles={['Super Admin', 'Company Admin']}>
                      <Payroll />
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/leave/*" 
                  element={
                    <ProtectedRoute allowedRoles={['Super Admin', 'Company Admin', 'Manager', 'Employee']}>
                      <Leave />
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/claims/*" 
                  element={
                    <ProtectedRoute allowedRoles={['Super Admin', 'Company Admin', 'Manager', 'Employee']}>
                      <Claims />
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/performance/*" 
                  element={
                    <ProtectedRoute allowedRoles={['Super Admin', 'Company Admin', 'Manager', 'Employee']}>
                      <Performance />
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/time-tracking/*" 
                  element={
                    <ProtectedRoute allowedRoles={['Super Admin', 'Company Admin', 'Manager', 'Employee']}>
                      <TimeTracking />
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/settings/*" 
                  element={
                    <ProtectedRoute allowedRoles={['Super Admin', 'Company Admin']}>
                      <Settings />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Catch-all route for 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
            <Toaster position="top-right" expand={false} richColors />
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
