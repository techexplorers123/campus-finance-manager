import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSchool } from '@/context/SchoolContext';
import { Bus, Plus, MapPin, Clock, Users } from 'lucide-react';

export const TransportPage: React.FC = () => {
  const { data } = useSchool();

  const getBusRoutes = (busId: number) => {
    return data.routes.filter(route => route.bus_id === busId);
  };

  const getRouteStops = (routeId: number) => {
    return data.stops.filter(stop => stop.route_id === routeId);
  };

  const getStopStudents = (stopId: number) => {
    const transportRecords = data.studentTransport.filter(st => st.stop_id === stopId);
    return transportRecords.map(record => 
      data.students.find(student => student.id === record.student_id)
    ).filter(Boolean);
  };

  const getStaffName = (staffId: number | null) => {
    if (!staffId) return 'Not Assigned';
    const staff = data.staff.find(s => s.id === staffId);
    return staff?.name || 'Unknown';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Transport Management</h1>
          <p className="text-muted-foreground">Manage buses, routes, and student transportation</p>
        </div>
        <Button variant="gradient" size="lg">
          <Plus className="h-5 w-5 mr-2" />
          Add Bus
        </Button>
      </div>

      {/* Transport Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Buses</CardTitle>
            <Bus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.buses.length}</div>
            <p className="text-xs text-muted-foreground">Active buses</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Routes</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.routes.length}</div>
            <p className="text-xs text-muted-foreground">Active routes</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Using Transport</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.studentTransport.length}</div>
            <p className="text-xs text-muted-foreground">Students</p>
          </CardContent>
        </Card>
      </div>

      {/* Bus List */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Bus Fleet</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {data.buses.map((bus) => {
              const routes = getBusRoutes(bus.id);
              return (
                <div key={bus.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                        <Bus className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{bus.bus_no}</h3>
                        <p className="text-sm text-muted-foreground">
                          Driver: {getStaffName(bus.bus_driver)} | 
                          Attendant: {getStaffName(bus.bus_attendant)}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">{routes.length} routes</Badge>
                  </div>

                  {/* Routes for this bus */}
                  <div className="space-y-3">
                    {routes.map((route) => {
                      const stops = getRouteStops(route.id);
                      const totalStudents = stops.reduce((sum, stop) => sum + getStopStudents(stop.id).length, 0);
                      return (
                        <div key={route.id} className="bg-muted/50 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{route.route_name}</h4>
                            <Badge variant="outline">{totalStudents} students</Badge>
                          </div>
                          
                          {/* Stops */}
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                            {stops.map((stop) => {
                              const students = getStopStudents(stop.id);
                              return (
                                <div key={stop.id} className="bg-card rounded p-2 text-sm">
                                  <div className="flex items-center justify-between">
                                    <span className="font-medium">{stop.stop_name}</span>
                                    <Badge variant="secondary" className="text-xs">
                                      {students.length}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {stop.stop_time}
                                    <span className="ml-2">₹{stop.stop_fee}</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};