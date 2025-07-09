import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSchool } from '@/context/SchoolContext';
import { Plus, Receipt, IndianRupee, Calendar, TrendingDown } from 'lucide-react';

export const ExpensesPage: React.FC = () => {
  const { data } = useSchool();

  const totalExpenses = data.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const monthlyExpenses = data.expenses
    .filter(expense => expense.date.startsWith(new Date().toISOString().slice(0, 7)))
    .reduce((sum, expense) => sum + expense.amount, 0);

  const getPaymentMode = (modeId: number) => {
    const mode = data.paymentModes.find(m => m.id === modeId);
    return mode?.name || 'Unknown';
  };

  const getStaffPayroll = (payrollId: number | null) => {
    if (!payrollId) return null;
    return data.staffPayroll.find(p => p.id === payrollId);
  };

  const getStaffName = (staffId: number) => {
    const staff = data.staff.find(s => s.id === staffId);
    return staff?.name || 'Unknown Staff';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Expenses</h1>
          <p className="text-muted-foreground">Track and manage all school expenses</p>
        </div>
        <Button variant="gradient" size="lg">
          <Plus className="h-5 w-5 mr-2" />
          Add Expense
        </Button>
      </div>

      {/* Expenses Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Expenses</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">₹{totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">₹{monthlyExpenses.toLocaleString()}</div>
            <div className="flex items-center text-xs">
              <TrendingDown className="h-3 w-3 text-success mr-1" />
              <span className="text-success">-5%</span>
              <span className="text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Records</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.expenses.length}</div>
            <p className="text-xs text-muted-foreground">Expense records</p>
          </CardContent>
        </Card>
      </div>

      {/* Expenses List */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Expense Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.expenses.map((expense) => {
              const payroll = getStaffPayroll(expense.staff_payroll_id);
              const isPayrollExpense = !!payroll;
              
              return (
                <div key={expense.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center">
                      <Receipt className="h-6 w-6 text-secondary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{expense.description}</h3>
                      {isPayrollExpense && payroll && (
                        <p className="text-sm text-muted-foreground">
                          Salary for {getStaffName(payroll.staff_id)}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {getPaymentMode(expense.mode)}
                        </Badge>
                        {isPayrollExpense && (
                          <Badge variant="secondary" className="text-xs">
                            Payroll
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-destructive">₹{expense.amount.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">{expense.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Expense Categories */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Expense Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-2">Payroll Expenses</h3>
              <p className="text-2xl font-bold text-primary">
                ₹{data.expenses
                  .filter(e => e.staff_payroll_id !== null)
                  .reduce((sum, e) => sum + e.amount, 0)
                  .toLocaleString()}
              </p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-2">Other Expenses</h3>
              <p className="text-2xl font-bold text-primary">
                ₹{data.expenses
                  .filter(e => e.staff_payroll_id === null)
                  .reduce((sum, e) => sum + e.amount, 0)
                  .toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};