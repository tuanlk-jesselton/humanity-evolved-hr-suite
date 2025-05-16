import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Check, Building, MapPin, Banknote } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function CompanySetup() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('company');
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const markStepComplete = (step: string) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
  };

  const isStepCompleted = (step: string) => completedSteps.includes(step);

  const handleContinue = () => {
    if (activeTab === 'company') {
      markStepComplete('company');
      setActiveTab('address');
    } else if (activeTab === 'address') {
      markStepComplete('address');
      setActiveTab('payroll');
    } else if (activeTab === 'payroll') {
      markStepComplete('payroll');
      handleFinish();
    }
  };

  const handleFinish = () => {
    toast({
      title: "Setup complete!",
      description: "Your company is ready to go.",
    });
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <Card className="w-full max-w-3xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Set up your company</CardTitle>
          <CardDescription>Complete these steps to get your HR system up and running</CardDescription>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="flex mb-8">
            <div className={`flex-1 flex items-center ${isStepCompleted('company') ? 'text-primary' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${isStepCompleted('company') ? 'bg-primary border-primary text-white' : 'border-muted'}`}>
                {isStepCompleted('company') ? <Check size={16} /> : '1'}
              </div>
              <div className="ml-2">Company Info</div>
            </div>
            <div className="w-10 h-1 bg-muted self-center mx-1"></div>
            <div className={`flex-1 flex items-center ${isStepCompleted('address') ? 'text-primary' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${isStepCompleted('address') ? 'bg-primary border-primary text-white' : 'border-muted'}`}>
                {isStepCompleted('address') ? <Check size={16} /> : '2'}
              </div>
              <div className="ml-2">Company Address</div>
            </div>
            <div className="w-10 h-1 bg-muted self-center mx-1"></div>
            <div className={`flex-1 flex items-center ${isStepCompleted('payroll') ? 'text-primary' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${isStepCompleted('payroll') ? 'bg-primary border-primary text-white' : 'border-muted'}`}>
                {isStepCompleted('payroll') ? <Check size={16} /> : '3'}
              </div>
              <div className="ml-2">Payroll Settings</div>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="company" disabled={activeTab !== 'company' && !isStepCompleted('company')}>
                <Building size={16} className="mr-2" />
                Company
              </TabsTrigger>
              <TabsTrigger value="address" disabled={activeTab !== 'address' && !isStepCompleted('company')}>
                <MapPin size={16} className="mr-2" />
                Address
              </TabsTrigger>
              <TabsTrigger value="payroll" disabled={activeTab !== 'payroll' && !isStepCompleted('address')}>
                <Banknote size={16} className="mr-2" />
                Payroll
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="company" className="p-4 pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="legal-name">Legal company name</Label>
                  <Input id="legal-name" placeholder="Example Inc." />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dba">Doing business as (optional)</Label>
                  <Input id="dba" placeholder="Example" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ein">Employer Identification Number (EIN)</Label>
                  <Input id="ein" placeholder="XX-XXXXXXX" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company-type">Company Type</Label>
                  <select
                    id="company-type"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select company type...</option>
                    <option value="s-corp">S Corporation</option>
                    <option value="c-corp">C Corporation</option>
                    <option value="llc">LLC</option>
                    <option value="partnership">Partnership</option>
                    <option value="non-profit">Non-Profit</option>
                  </select>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="address" className="p-4 pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address-1">Address Line 1</Label>
                  <Input id="address-1" placeholder="123 Main St" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address-2">Address Line 2 (optional)</Label>
                  <Input id="address-2" placeholder="Suite 100" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="San Francisco" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <select
                      id="state"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Select state...</option>
                      <option value="CA">California</option>
                      <option value="NY">New York</option>
                      <option value="TX">Texas</option>
                      {/* Other states would be listed here */}
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" placeholder="94103" />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="payroll" className="p-4 pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pay-schedule">Pay Schedule</Label>
                  <select
                    id="pay-schedule"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select pay schedule...</option>
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Bi-weekly</option>
                    <option value="semimonthly">Semi-monthly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="next-payday">Next Payday</Label>
                  <Input id="next-payday" type="date" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bank-info">Bank Account Information</Label>
                  <div className="p-4 border border-muted rounded-md bg-muted/20">
                    <p className="text-sm">We'll collect your bank account information for payroll processing when you're ready to run your first payroll.</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => navigate('/login')}>Save & Exit</Button>
          <Button onClick={handleContinue}>
            {activeTab === 'payroll' ? 'Complete Setup' : 'Continue'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
