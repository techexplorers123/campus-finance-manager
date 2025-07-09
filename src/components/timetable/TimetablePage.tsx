import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useSchool } from '@/context/SchoolContext';
import { Plus, Edit, Trash2, Clock } from 'lucide-react';
import { TimeSlot } from '@/types/school';

export const TimetablePage: React.FC = () => {
  const { data } = useSchool();
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [selectedSubClass, setSelectedSubClass] = useState<number | null>(null);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const periods = [1, 2, 3, 4, 5, 6, 7, 8];

  const filteredTimetable = data.timetable.filter(slot => {
    const classMatch = selectedClass === null || slot.class_id === selectedClass;
    const subClassMatch = selectedSubClass === null || slot.sub_class_id === selectedSubClass;
    return classMatch && subClassMatch;
  });

  const getSubjectName = (subjectId: number) => {
    const subject = data.subjects.find(s => s.id === subjectId);
    return subject?.subject_name || 'Unknown';
  };

  const getTeacherName = (teacherId: number) => {
    const teacher = data.staff.find(s => s.id === teacherId);
    return teacher?.name || 'Unknown';
  };

  const getClassName = (classId: number) => {
    const cls = data.classes.find(c => c.id === classId);
    return cls?.name || 'Unknown';
  };

  const getSubClassName = (subClassId: number) => {
    const subCls = data.subClasses.find(sc => sc.id === subClassId);
    return subCls?.label || 'Unknown';
  };

  const getSlotForDayPeriod = (day: string, period: number) => {
    return filteredTimetable.find(slot => slot.day === day && slot.period === period);
  };

  const filteredSubClasses = data.subClasses.filter(sc => 
    selectedClass === null || sc.class_id === selectedClass
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Timetable Management</h1>
          <p className="text-muted-foreground">Manage class schedules and time slots</p>
        </div>
        <Button variant="gradient" size="lg">
          <Plus className="h-5 w-5 mr-2" />
          Add Time Slot
        </Button>
      </div>

      {/* Filters */}
      <Card className="shadow-card">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Select value={selectedClass?.toString() || ''} onValueChange={(value) => {
                setSelectedClass(value ? parseInt(value) : null);
                setSelectedSubClass(null);
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Classes</SelectItem>
                  {data.classes.map(cls => (
                    <SelectItem key={cls.id} value={cls.id.toString()}>
                      {cls.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Select value={selectedSubClass?.toString() || ''} onValueChange={(value) => 
                setSelectedSubClass(value ? parseInt(value) : null)
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Select Sub-Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Sub-Classes</SelectItem>
                  {filteredSubClasses.map(subCls => (
                    <SelectItem key={subCls.id} value={subCls.id.toString()}>
                      {subCls.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timetable Grid */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Weekly Timetable
            {selectedClass && (
              <Badge variant="secondary">
                {getClassName(selectedClass)} {selectedSubClass && `- ${getSubClassName(selectedSubClass)}`}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-border p-2 bg-muted text-left">Period</th>
                  {days.map(day => (
                    <th key={day} className="border border-border p-2 bg-muted text-center min-w-[120px]">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {periods.map(period => (
                  <tr key={period}>
                    <td className="border border-border p-2 bg-muted/50 font-medium">
                      Period {period}
                    </td>
                    {days.map(day => {
                      const slot = getSlotForDayPeriod(day, period);
                      return (
                        <td key={`${day}-${period}`} className="border border-border p-2 text-center">
                          {slot ? (
                            <div className="bg-primary/10 rounded-lg p-2 hover:bg-primary/20 transition-smooth cursor-pointer group">
                              <div className="font-medium text-sm">{getSubjectName(slot.subject_id)}</div>
                              <div className="text-xs text-muted-foreground">{getTeacherName(slot.teacher_id)}</div>
                              <div className="text-xs text-muted-foreground">{slot.start_time} - {slot.end_time}</div>
                              <div className="flex justify-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="w-full h-16 border-2 border-dashed border-muted-foreground/30 hover:border-primary/50"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};