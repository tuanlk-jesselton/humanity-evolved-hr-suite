
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building, Mail, Phone, Globe, MapPin, Edit } from 'lucide-react';
import { useState } from 'react';

export function CompanyProfileTab() {
  const [isEditing, setIsEditing] = useState(false);
  const [companyData, setCompanyData] = useState({
    name: 'Acme Corporation',
    legalName: 'Acme Inc.',
    ein: '12-3456789',
    address: '123 Business Ave, Suite 100',
    city: 'San Francisco',
    state: 'CA',
    zip: '94107',
    phone: '(415) 555-1234',
    email: 'contact@acmeinc.com',
    website: 'www.acmeinc.com',
    industry: 'Technology'
  });
  
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleSave = () => {
    setIsEditing(false);
    // In a real app, this would save the data to the backend
  };
  
  const handleChange = (field: string, value: string) => {
    setCompanyData({
      ...companyData,
      [field]: value
    });
  };
  
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary to-primary/70 relative">
          {isEditing && (
            <Button variant="ghost" size="sm" className="absolute top-2 right-2 text-white">
              <Edit size={16} className="mr-1" />
              Change Cover
            </Button>
          )}
        </div>
        <div className="px-6 pb-6">
          <div className="flex flex-col items-center md:items-start md:flex-row md:justify-between -mt-10">
            <div className="flex flex-col items-center md:flex-row md:items-end gap-4">
              <div className="w-24 h-24 rounded-full bg-primary/20 border-4 border-white dark:border-gray-800 flex items-center justify-center overflow-hidden">
                <Building size={40} className="text-primary" />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold">{companyData.name}</h2>
                <p className="text-muted-foreground">{companyData.industry}</p>
              </div>
            </div>
            {!isEditing ? (
              <Button onClick={handleEdit} className="mt-4 md:mt-0">
                <Edit size={16} className="mr-2" />
                Edit Profile
              </Button>
            ) : (
              <Button onClick={handleSave} className="mt-4 md:mt-0">
                Save Changes
              </Button>
            )}
          </div>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
            <CardDescription>Basic company details and registration information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              {isEditing ? (
                <Input 
                  id="companyName" 
                  value={companyData.name} 
                  onChange={(e) => handleChange('name', e.target.value)}
                />
              ) : (
                <div className="p-2 bg-muted/50 rounded-md">{companyData.name}</div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="legalName">Legal Business Name</Label>
              {isEditing ? (
                <Input 
                  id="legalName" 
                  value={companyData.legalName} 
                  onChange={(e) => handleChange('legalName', e.target.value)}
                />
              ) : (
                <div className="p-2 bg-muted/50 rounded-md">{companyData.legalName}</div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ein">Employer Identification Number (EIN)</Label>
              {isEditing ? (
                <Input 
                  id="ein" 
                  value={companyData.ein} 
                  onChange={(e) => handleChange('ein', e.target.value)}
                />
              ) : (
                <div className="p-2 bg-muted/50 rounded-md">{companyData.ein}</div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              {isEditing ? (
                <Input 
                  id="industry" 
                  value={companyData.industry} 
                  onChange={(e) => handleChange('industry', e.target.value)}
                />
              ) : (
                <div className="p-2 bg-muted/50 rounded-md">{companyData.industry}</div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Contact details for your company</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              {isEditing ? (
                <Input 
                  id="address" 
                  value={companyData.address} 
                  onChange={(e) => handleChange('address', e.target.value)}
                />
              ) : (
                <div className="flex items-start gap-2 p-2 bg-muted/50 rounded-md">
                  <MapPin size={16} className="mt-1 text-muted-foreground" />
                  <span>{companyData.address}, {companyData.city}, {companyData.state} {companyData.zip}</span>
                </div>
              )}
            </div>
            
            {isEditing && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input 
                    id="city" 
                    value={companyData.city} 
                    onChange={(e) => handleChange('city', e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input 
                      id="state" 
                      value={companyData.state} 
                      onChange={(e) => handleChange('state', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input 
                      id="zip" 
                      value={companyData.zip} 
                      onChange={(e) => handleChange('zip', e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              {isEditing ? (
                <Input 
                  id="phone" 
                  value={companyData.phone} 
                  onChange={(e) => handleChange('phone', e.target.value)}
                />
              ) : (
                <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                  <Phone size={16} className="text-muted-foreground" />
                  <span>{companyData.phone}</span>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              {isEditing ? (
                <Input 
                  id="email" 
                  type="email"
                  value={companyData.email} 
                  onChange={(e) => handleChange('email', e.target.value)}
                />
              ) : (
                <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                  <Mail size={16} className="text-muted-foreground" />
                  <span>{companyData.email}</span>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              {isEditing ? (
                <Input 
                  id="website" 
                  value={companyData.website} 
                  onChange={(e) => handleChange('website', e.target.value)}
                />
              ) : (
                <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                  <Globe size={16} className="text-muted-foreground" />
                  <span>{companyData.website}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
