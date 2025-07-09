import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useSchool } from '@/context/SchoolContext';
import { Plus, Search, Filter, Edit, Trash2, Eye } from 'lucide-react';
import { Student } from '@/types/school';

export const StudentsPage: React.FC = () => {
  const { data } = useSchool();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState<number | null>(null);

  const filteredStudents = data.students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === null || student.class_id === selectedClass;
    return matchesSearch && matchesClass;
  });

  const getClassName = (classId: number) => {
    const cls = data.classes.find(c => c.id === classId);
    return cls?.name || 'Unknown';
  };

  const getSubClassName = (subClassId: number) => {
    const subCls = data.subClasses.find(sc => sc.id === subClassId);
    return subCls?.label || 'Unknown';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Students</h1>
          <p className="text-muted-foreground">Manage student records and information</p>
        </div>
        <Button variant="gradient" size="lg">
          <Plus className="h-5 w-5 mr-2" />
          Add Student
        </Button>
      </div>

      {/* Filters */}
      <Card className="shadow-card">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedClass === null ? 'secondary' : 'outline'}
                onClick={() => setSelectedClass(null)}
                size="sm"
              >
                All Classes
              </Button>
              {data.classes.map(cls => (
                <Button
                  key={cls.id}
                  variant={selectedClass === cls.id ? 'secondary' : 'outline'}
                  onClick={() => setSelectedClass(cls.id)}
                  size="sm"
                >
                  {cls.name}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students List */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Students List
            <Badge variant="secondary">{filteredStudents.length} students</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredStudents.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-smooth">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-semibold">
                      {student.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{student.name}</h3>
                    <p className="text-sm text-muted-foreground">{student.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {getClassName(student.class_id)} - {getSubClassName(student.sub_class_id)}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {student.gender}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};