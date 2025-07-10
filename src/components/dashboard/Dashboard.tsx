import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSchool } from '@/context/SchoolContext';
import { OfflineIndicator } from '@/components/offline/OfflineIndicator';
import { Users, GraduationCap, Bus, CreditCard, TrendingUp, TrendingDown } from 'lucide-react';
import schoolHero from '@/assets/school-hero.jpg';

export const Dashboard: React.FC = () => {
  const { data } = useSchool();

  const stats = [
    {
      title: 'Total Students',
      value: data.students.length,
      icon: Users,
      color: 'bg-primary',
      change: '+12%',
      trend: 'up'
    },
    {
      title: 'Total Classes',
      value: data.classes.length,
      icon: GraduationCap,
      color: 'bg-secondary',
      change: '+2%',
      trend: 'up'
    },
    {
      title: 'Active Buses',
      value: data.buses.length,
      icon: Bus,
      color: 'bg-info',
      change: '0%',
      trend: 'stable'
    },
    {
      title: 'Monthly Revenue',
      value: `₹${data.payments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}`,
      icon: CreditCard,
      color: 'bg-success',
      change: '+8%',
      trend: 'up'
    }
  ];

  const recentPayments = data.payments.slice(-5);
  const recentExpenses = data.expenses.slice(-5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening at your school.</p>
        </div>
        <Button variant="gradient" size="lg">
          Generate Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-card hover:shadow-elevated transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-sm">
                {stat.trend === 'up' && <TrendingUp className="h-4 w-4 text-success mr-1" />}
                {stat.trend === 'down' && <TrendingDown className="h-4 w-4 text-destructive mr-1" />}
                <span className={stat.trend === 'up' ? 'text-success' : stat.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'}>
                  {stat.change}
                </span>
                <span className="text-muted-foreground ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Payments */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Payments
              <Badge variant="secondary">{recentPayments.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPayments.map((payment) => {
                const student = data.students.find(s => s.id === payment.student_id);
                return (
                  <div key={payment.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">{student?.name || 'Unknown Student'}</p>
                      <p className="text-sm text-muted-foreground">{payment.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-success">₹{payment.amount.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">{payment.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Expenses */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Expenses
              <Badge variant="outline">{recentExpenses.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentExpenses.map((expense) => (
                <div key={expense.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">{expense.description}</p>
                    <p className="text-sm text-muted-foreground">{expense.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-destructive">₹{expense.amount.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
          <OfflineIndicator />
        </div>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Users className="h-6 w-6 mb-2" />
              Add Student
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <CreditCard className="h-6 w-6 mb-2" />
              Record Payment
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Bus className="h-6 w-6 mb-2" />
              Manage Transport
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <GraduationCap className="h-6 w-6 mb-2" />
              Manage Classes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};