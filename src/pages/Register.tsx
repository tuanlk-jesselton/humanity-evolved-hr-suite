
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useToast } from '@/components/ui/use-toast';

export default function Register() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    firstName: '',
    lastName: '',
    workEmail: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    employeeCount: '',
    industry: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNextStep = () => {
    if (step === 1) {
      // Validate first step
      if (!formData.firstName || !formData.lastName || !formData.workEmail) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields",
          variant: "destructive"
        });
        return;
      }
      setStep(2);
    } else if (step === 2) {
      // Validate second step
      if (!formData.companyName || !formData.employeeCount || !formData.industry) {
        toast({
          title: "Missing company information",
          description: "Please fill in all required fields",
          variant: "destructive"
        });
        return;
      }
      setStep(3);
    } else if (step === 3) {
      // Validate password
      if (!formData.password || formData.password !== formData.confirmPassword) {
        toast({
          title: "Password error",
          description: "Passwords do not match or are empty",
          variant: "destructive"
        });
        return;
      }
      // Complete registration
      handleRegister();
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleRegister = () => {
    // In a real app, this would make an API call to register the user
    toast({
      title: "Registration successful!",
      description: "Setting up your account...",
    });
    
    // Simulate account creation and redirect to company setup
    setTimeout(() => {
      navigate('/company-setup');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl">HR Monster</CardTitle>
          <CardDescription>Create your company account</CardDescription>
          <div className="flex justify-center space-x-2 pt-4">
            <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-muted'}`}></div>
            <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-muted'}`}></div>
            <div className={`w-3 h-3 rounded-full ${step >= 3 ? 'bg-primary' : 'bg-muted'}`}></div>
          </div>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Tell us about yourself</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="workEmail">Work email</Label>
                <Input
                  id="workEmail"
                  name="workEmail"
                  type="email"
                  value={formData.workEmail}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Company details</h2>
              <div className="space-y-2">
                <Label htmlFor="companyName">Company name</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employeeCount">Number of employees</Label>
                <select
                  id="employeeCount"
                  name="employeeCount"
                  value={formData.employeeCount}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="">Select...</option>
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-100">51-100</option>
                  <option value="101-500">101-500</option>
                  <option value="500+">500+</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <select
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="">Select...</option>
                  <option value="technology">Technology</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="retail">Retail</option>
                  <option value="finance">Finance</option>
                  <option value="education">Education</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Create account</h2>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="pt-4 text-sm text-muted-foreground">
                By clicking "Create account", you agree to our <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 ? (
            <Button variant="outline" onClick={handlePrevStep}>Back</Button>
          ) : (
            <Button variant="outline" onClick={() => navigate('/login')}>Sign in instead</Button>
          )}
          <Button onClick={handleNextStep}>
            {step < 3 ? "Continue" : "Create account"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
