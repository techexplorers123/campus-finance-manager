import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useSchool } from '@/context/SchoolContext';
import { Plus, Search, CreditCard, TrendingUp, Calendar, IndianRupee } from 'lucide-react';

export const PaymentsPage: React.FC = () => {
  const { data } = useSchool();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState<string>('');

  const filteredPayments = data.payments.filter(payment => {
    const student = data.students.find(s => s.id === payment.student_id);
    const matchesSearch = student?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMonth = selectedMonth === '' || payment.date.startsWith(selectedMonth);
    return matchesSearch && matchesMonth;
  });

  const totalRevenue = data.payments.reduce((sum, payment) => sum + payment.amount, 0);
  const monthlyRevenue = data.payments
    .filter(payment => payment.date.startsWith(new Date().toISOString().slice(0, 7)))
    .reduce((sum, payment) => sum + payment.amount, 0);

  const getStudentName = (studentId: number | null) => {
    if (!studentId) return 'N/A';
    const student = data.students.find(s => s.id === studentId);
    return student?.name || 'Unknown Student';
  };

  const getPaymentMode = (modeId: number) => {
    const mode = data.paymentModes.find(m => m.id === modeId);
    return mode?.name || 'Unknown';
  };

  const getPaymentTypeColor = (type: string) => {
    switch (type) {
      case 'Student Fee': return 'bg-primary';
      case 'Donation': return 'bg-success';
      case 'Event': return 'bg-warning';
      case 'Sponsorship': return 'bg-info';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payments</h1>
          <p className="text-muted-foreground">Track and manage all payments</p>
        </div>
        <Button variant="gradient" size="lg">
          <Plus className="h-5 w-5 mr-2" />
          Record Payment
        </Button>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{monthlyRevenue.toLocaleString()}</div>
            <div className="flex items-center text-xs">
              <TrendingUp className="h-3 w-3 text-success mr-1" />
              <span className="text-success">+8%</span>
              <span className="text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Payments</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.payments.length}</div>
            <p className="text-xs text-muted-foreground">Transactions</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="shadow-card">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-auto"
            />
          </div>
        </CardContent>
      </Card>

      {/* Payments List */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Payment History
            <Badge variant="secondary">{filteredPayments.length} payments</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPayments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getPaymentTypeColor(payment.payment_for)}`}>
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{getStudentName(payment.student_id)}</h3>
                    <p className="text-sm text-muted-foreground">{payment.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {payment.payment_for}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {getPaymentMode(payment.mode)}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-success">₹{payment.amount.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">{payment.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};