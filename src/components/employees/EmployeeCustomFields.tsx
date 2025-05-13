
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Save, X } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface EmployeeCustomFieldsProps {
  employeeId?: string;
}

// Mock custom fields data
const customFieldsDefinitions = [
  { id: 1, name: "Emergency Contact Relationship", fieldType: "text", isRequired: true },
  { id: 2, name: "T-Shirt Size", fieldType: "select", isRequired: false, options: ["S", "M", "L", "XL", "XXL"] },
  { id: 3, name: "Has Company Laptop", fieldType: "boolean", isRequired: true },
];

const employeeCustomFieldValues = {
  "EMP-001": [
    { fieldId: 1, value: "Spouse" },
    { fieldId: 2, value: "M" },
    { fieldId: 3, value: true },
  ],
  "EMP-002": [
    { fieldId: 1, value: "Wife" },
    { fieldId: 2, value: "L" },
    { fieldId: 3, value: true },
  ]
};

export function EmployeeCustomFields({ employeeId = "EMP-001" }: EmployeeCustomFieldsProps) {
  const [customFields, setCustomFields] = useState(customFieldsDefinitions);
  const [fieldValues, setFieldValues] = useState(
    employeeCustomFieldValues[employeeId as keyof typeof employeeCustomFieldValues] || []
  );
  const [isAddingField, setIsAddingField] = useState(false);
  const [newField, setNewField] = useState({
    name: "",
    fieldType: "text",
    isRequired: false,
    options: [] as string[]
  });
  const [newOption, setNewOption] = useState("");
  
  const getValue = (fieldId: number) => {
    const fieldValue = fieldValues.find(fv => fv.fieldId === fieldId);
    return fieldValue ? fieldValue.value : "";
  };
  
  const handleValueChange = (fieldId: number, value: string | boolean) => {
    setFieldValues(prev => {
      const existing = prev.find(fv => fv.fieldId === fieldId);
      if (existing) {
        return prev.map(fv => fv.fieldId === fieldId ? { ...fv, value } : fv);
      } else {
        return [...prev, { fieldId, value }];
      }
    });
  };
  
  const handleNewFieldChange = (key: string, value: any) => {
    setNewField(prev => ({ ...prev, [key]: value }));
  };
  
  const addOption = () => {
    if (newOption && !newField.options.includes(newOption)) {
      setNewField(prev => ({
        ...prev,
        options: [...prev.options, newOption]
      }));
      setNewOption("");
    }
  };
  
  const removeOption = (option: string) => {
    setNewField(prev => ({
      ...prev,
      options: prev.options.filter(o => o !== option)
    }));
  };
  
  const handleAddField = () => {
    if (newField.name) {
      const newCustomField = {
        id: Date.now(),
        ...newField,
        options: newField.fieldType === 'select' ? newField.options : []
      };
      
      setCustomFields([...customFields, newCustomField]);
      setNewField({
        name: "",
        fieldType: "text",
        isRequired: false,
        options: []
      });
      setIsAddingField(false);
    }
  };
  
  const renderFieldInput = (field: typeof customFieldsDefinitions[0]) => {
    const value = getValue(field.id);
    
    switch (field.fieldType) {
      case "text":
        return (
          <Input
            id={`field-${field.id}`}
            value={value as string}
            onChange={(e) => handleValueChange(field.id, e.target.value)}
          />
        );
      
      case "select":
        return (
          <Select 
            value={value as string} 
            onValueChange={(val) => handleValueChange(field.id, val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      case "boolean":
        return (
          <Switch
            checked={Boolean(value)}
            onCheckedChange={(checked) => handleValueChange(field.id, checked)}
          />
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Custom Fields</h2>
        <Button onClick={() => setIsAddingField(!isAddingField)}>
          <Plus size={16} className="mr-2" />
          Add Custom Field
        </Button>
      </div>
      
      {isAddingField && (
        <Card>
          <CardHeader>
            <CardTitle>New Custom Field</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="fieldName">Field Name</Label>
                <Input 
                  id="fieldName" 
                  value={newField.name}
                  onChange={(e) => handleNewFieldChange("name", e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="fieldType">Field Type</Label>
                <Select
                  value={newField.fieldType}
                  onValueChange={(value) => handleNewFieldChange("fieldType", value)}
                >
                  <SelectTrigger id="fieldType">
                    <SelectValue placeholder="Select a field type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="select">Select</SelectItem>
                    <SelectItem value="boolean">Yes/No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {newField.fieldType === "select" && (
                <div>
                  <Label>Options</Label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Input 
                        value={newOption}
                        onChange={(e) => setNewOption(e.target.value)}
                        placeholder="Add an option"
                      />
                      <Button type="button" size="sm" onClick={addOption}>
                        Add
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                      {newField.options.map((option, i) => (
                        <div 
                          key={i} 
                          className="flex items-center gap-1 bg-muted text-muted-foreground px-2 py-1 rounded-md"
                        >
                          <span>{option}</span>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="icon" 
                            className="h-4 w-4" 
                            onClick={() => removeOption(option)}
                          >
                            <X size={12} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="required"
                  checked={newField.isRequired}
                  onCheckedChange={(checked) => handleNewFieldChange("isRequired", checked)}
                />
                <Label htmlFor="required">Required Field</Label>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddingField(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddField}>Save Field</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="space-y-4">
        {customFields.map((field) => (
          <Card key={field.id}>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div className="space-y-1">
                  <Label htmlFor={`field-${field.id}`}>{field.name}</Label>
                  {field.isRequired && (
                    <span className="text-sm text-red-500 ml-1">*</span>
                  )}
                </div>
                <div className="md:col-span-2">
                  {renderFieldInput(field)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {customFields.length === 0 && !isAddingField && (
          <div className="text-center py-8 text-muted-foreground">
            No custom fields defined yet.
          </div>
        )}
        
        {customFields.length > 0 && (
          <div className="flex justify-end">
            <Button>
              <Save size={16} className="mr-2" />
              Save Changes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
