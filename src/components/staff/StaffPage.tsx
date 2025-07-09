import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSchool } from '@/context/SchoolContext';
import { Plus, UserCheck, Calendar, IndianRupee, Phone, Mail } from 'lucide-react';

export const StaffPage: React.FC = () => {
  const { data } = useSchool();

  const getStaffRole = (roleId: number | null) => {
    if (!roleId) return 'No Role';
    const role = data.staffRoles.find(r => r.id === roleId);
    return role?.title || 'Unknown';
  };

  const getStaffPayroll = (staffId: number) => {
    return data.staffPayroll.find(p => p.staff_id === staffId);
  };

  const totalStaffSalary = data.staffPayroll.reduce((sum, payroll) => sum + payroll.net_salary, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Staff Management</h1>
          <p className="text-muted-foreground">Manage staff members and payroll</p>
        </div>
        <Button variant="gradient" size="lg">
          <Plus className="h-5 w-5 mr-2" />
          Add Staff
        </Button>
      </div>

      {/* Staff Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Staff</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.staff.length}</div>
            <p className="text-xs text-muted-foreground">Active employees</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Staff Roles</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.staffRoles.length}</div>
            <p className="text-xs text-muted-foreground">Different roles</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Payroll</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalStaffSalary.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Monthly expenses</p>
          </CardContent>
        </Card>
      </div>

      {/* Staff List */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Staff Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.staff.map((staff) => {
              const payroll = getStaffPayroll(staff.id);
              const role = getStaffRole(staff.job_title_id);
              
              return (
                <div key={staff.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center">
                      <UserCheck className="h-6 w-6 text-secondary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{staff.name}</h3>
                      <p className="text-sm text-muted-foreground">{role}</p>
                      <div className="flex items-center gap-4 mt-1">
                        {staff.phone && (
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Phone className="h-3 w-3 mr-1" />
                            {staff.phone}
                          </div>
                        )}
                        {staff.email && (
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Mail className="h-3 w-3 mr-1" />
                            {staff.email}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">{staff.gender}</Badge>
                      <Badge variant="outline" className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {staff.join_date}
                      </Badge>
                    </div>
                    {payroll && (
                      <p className="text-lg font-bold text-success mt-2">
                        ₹{payroll.net_salary.toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Staff Roles */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Staff Roles & Salaries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.staffRoles.map((role) => {
              const staffCount = data.staff.filter(s => s.job_title_id === role.id).length;
              return (
                <div key={role.id} className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold">{role.title}</h3>
                  <p className="text-2xl font-bold text-primary">₹{role.salary.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">{staffCount} staff members</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};