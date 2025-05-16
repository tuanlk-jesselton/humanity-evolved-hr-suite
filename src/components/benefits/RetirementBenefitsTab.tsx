
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PiggyBank, TrendingUp } from 'lucide-react';

export function RetirementBenefitsTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>401(k) Plan</CardTitle>
          <CardDescription>Your retirement savings and employer match</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Contribution Summary</h3>
              <div className="bg-muted p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Your Contribution:</span>
                  <span className="font-medium">5% of salary</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Employer Match:</span>
                  <span className="font-medium">100% up to 4%</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Total Monthly:</span>
                  <span className="font-medium">$750.00</span>
                </div>
                <div className="flex justify-between font-medium text-primary">
                  <span>Total Annual:</span>
                  <span>$9,000.00</span>
                </div>
              </div>

              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  <PiggyBank size={16} className="mr-2" />
                  Change Contribution
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Portfolio Value</h3>
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">$48,532.67</span>
                  <span className="text-green-500 flex items-center text-sm">
                    <TrendingUp size={16} className="mr-1" />
                    +12.4% YTD
                  </span>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-2">Portfolio Allocation</h4>
                  <div className="flex h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-500 w-[45%]" />
                    <div className="bg-green-500 w-[25%]" />
                    <div className="bg-purple-500 w-[15%]" />
                    <div className="bg-yellow-500 w-[10%]" />
                    <div className="bg-red-500 w-[5%]" />
                  </div>
                  <div className="flex text-xs mt-2 justify-between text-muted-foreground">
                    <span>Stocks: 45%</span>
                    <span>Bonds: 25%</span>
                    <span>Other: 30%</span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  <TrendingUp size={16} className="mr-2" />
                  Change Investments
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Retirement Planning</CardTitle>
          <CardDescription>Tools and projections for your retirement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Based on your current contributions and investment allocation, you're on track to meet 85% of your retirement income goal.
            </p>
            
            <div className="w-full bg-muted rounded-full h-2.5">
              <div className="bg-primary h-2.5 rounded-full w-[85%]"></div>
            </div>
            
            <div className="flex justify-between text-sm">
              <span>Current progress</span>
              <span className="font-medium">85%</span>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4">
                <h3 className="font-medium">Retirement Age</h3>
                <p className="text-2xl font-bold mt-2">67</p>
                <p className="text-xs text-muted-foreground mt-1">Estimated</p>
              </Card>
              
              <Card className="p-4">
                <h3 className="font-medium">Income Replacement</h3>
                <p className="text-2xl font-bold mt-2">85%</p>
                <p className="text-xs text-muted-foreground mt-1">Target: 100%</p>
              </Card>
              
              <Card className="p-4">
                <h3 className="font-medium">Monthly Income</h3>
                <p className="text-2xl font-bold mt-2">$5,100</p>
                <p className="text-xs text-muted-foreground mt-1">In retirement</p>
              </Card>
            </div>

            <div className="flex justify-end mt-2">
              <Button>View Retirement Calculator</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
