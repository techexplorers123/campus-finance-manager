import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSchool } from '@/context/SchoolContext';
import { Plus, GraduationCap, Users, BookOpen, User } from 'lucide-react';

export const ClassesPage: React.FC = () => {
  const { data } = useSchool();

  const getClassStudents = (classId: number) => {
    return data.students.filter(student => student.class_id === classId);
  };

  const getClassSubjects = (classId: number) => {
    return data.subjects.filter(subject => subject.class_id === classId);
  };

  const getSubClasses = (classId: number) => {
    return data.subClasses.filter(sc => sc.class_id === classId);
  };

  const getTeacherName = (teacherId: number | null) => {
    if (!teacherId) return 'Not Assigned';
    const teacher = data.staff.find(s => s.id === teacherId);
    return teacher?.name || 'Unknown';
  };

  const getClassBooks = (classId: number) => {
    return data.books.filter(book => book.class_id === classId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Classes</h1>
          <p className="text-muted-foreground">Manage classes, subjects, and academic structure</p>
        </div>
        <Button variant="gradient" size="lg">
          <Plus className="h-5 w-5 mr-2" />
          Add Class
        </Button>
      </div>

      {/* Classes Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Classes</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.classes.length}</div>
            <p className="text-xs text-muted-foreground">Active classes</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Subjects</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.subjects.length}</div>
            <p className="text-xs text-muted-foreground">Subjects offered</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Sub Classes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.subClasses.length}</div>
            <p className="text-xs text-muted-foreground">Divisions</p>
          </CardContent>
        </Card>
      </div>

      {/* Classes List */}
      <div className="space-y-6">
        {data.classes.map((cls) => {
          const students = getClassStudents(cls.id);
          const subjects = getClassSubjects(cls.id);
          const subClasses = getSubClasses(cls.id);
          const books = getClassBooks(cls.id);

          return (
            <Card key={cls.id} className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                      <GraduationCap className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{cls.name}</CardTitle>
                      <p className="text-muted-foreground">Annual fee: ₹{cls.amount.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">{students.length} students</Badge>
                    <Badge variant="outline">{subjects.length} subjects</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Sub Classes */}
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      Sub Classes
                    </h3>
                    <div className="space-y-2">
                      {subClasses.map((subClass) => (
                        <div key={subClass.id} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                          <span className="font-medium">{cls.name} - {subClass.label}</span>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <User className="h-3 w-3 mr-1" />
                            {getTeacherName(subClass.class_teacher)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Subjects */}
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Subjects
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {subjects.map((subject) => (
                        <div key={subject.id} className="p-2 bg-muted/50 rounded">
                          <span className="font-medium">{subject.subject_name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Books */}
                {books.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-semibold mb-3">Required Books</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {books.map((book) => (
                        <div key={book.id} className="p-3 bg-muted/50 rounded flex items-center justify-between">
                          <span className="font-medium">{book.name}</span>
                          <Badge variant="outline">₹{book.amount}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};