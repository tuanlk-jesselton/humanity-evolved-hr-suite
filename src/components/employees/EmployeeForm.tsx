
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';

// Define the validation schema using Yup
const EmployeeSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  jobTitle: Yup.string().required('Job title is required'),
  department: Yup.string().required('Department is required'),
  employeeId: Yup.string().required('Employee ID is required'),
  startDate: Yup.date().required('Start date is required'),
  phoneNumber: Yup.string()
    .matches(/^\+?[0-9]{10,15}$/, 'Phone number is not valid')
    .required('Phone number is required'),
});

interface EmployeeFormProps {
  initialValues?: {
    firstName: string;
    lastName: string;
    email: string;
    jobTitle: string;
    department: string;
    employeeId: string;
    startDate: string;
    phoneNumber: string;
  };
  onSubmit: (values: any) => void;
  departments?: { id: string; name: string }[];
  isEditing?: boolean;
}

export default function EmployeeForm({ 
  initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    jobTitle: '',
    department: '',
    employeeId: '',
    startDate: '',
    phoneNumber: '',
  },
  onSubmit,
  departments = [],
  isEditing = false
}: EmployeeFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Employee' : 'Add New Employee'}</CardTitle>
      </CardHeader>
      <Formik
        initialValues={initialValues}
        validationSchema={EmployeeSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Field 
                    as={Input}
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    className={errors.firstName && touched.firstName ? "border-destructive" : ""}
                  />
                  <ErrorMessage name="firstName" component="div" className="text-sm text-destructive" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Field 
                    as={Input}
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    className={errors.lastName && touched.lastName ? "border-destructive" : ""}
                  />
                  <ErrorMessage name="lastName" component="div" className="text-sm text-destructive" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Field 
                  as={Input}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  className={errors.email && touched.email ? "border-destructive" : ""}
                />
                <ErrorMessage name="email" component="div" className="text-sm text-destructive" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Field 
                  as={Input}
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  className={errors.phoneNumber && touched.phoneNumber ? "border-destructive" : ""}
                />
                <ErrorMessage name="phoneNumber" component="div" className="text-sm text-destructive" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Field 
                    as={Input}
                    id="jobTitle"
                    name="jobTitle"
                    placeholder="Job Title"
                    className={errors.jobTitle && touched.jobTitle ? "border-destructive" : ""}
                  />
                  <ErrorMessage name="jobTitle" component="div" className="text-sm text-destructive" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select
                    name="department"
                    onValueChange={(value) => setFieldValue('department', value)}
                    defaultValue={values.department}
                  >
                    <SelectTrigger className={errors.department && touched.department ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.length > 0 ? (
                        departments.map((dept) => (
                          <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                        ))
                      ) : (
                        <>
                          <SelectItem value="engineering">Engineering</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="sales">Sales</SelectItem>
                          <SelectItem value="hr">Human Resources</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="operations">Operations</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                  <ErrorMessage name="department" component="div" className="text-sm text-destructive" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employeeId">Employee ID</Label>
                  <Field 
                    as={Input}
                    id="employeeId"
                    name="employeeId"
                    placeholder="Employee ID"
                    className={errors.employeeId && touched.employeeId ? "border-destructive" : ""}
                  />
                  <ErrorMessage name="employeeId" component="div" className="text-sm text-destructive" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Field 
                    as={Input}
                    id="startDate"
                    name="startDate"
                    type="date"
                    className={errors.startDate && touched.startDate ? "border-destructive" : ""}
                  />
                  <ErrorMessage name="startDate" component="div" className="text-sm text-destructive" />
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" type="button">Cancel</Button>
              <Button type="submit">{isEditing ? 'Update' : 'Add'} Employee</Button>
            </CardFooter>
          </Form>
        )}
      </Formik>
    </Card>
  );
}
