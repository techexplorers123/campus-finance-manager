import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useSchool } from '@/context/SchoolContext';
import { 
  Settings, 
  Palette, 
  GraduationCap, 
  Plus, 
  Trash2, 
  Edit,
  Save,
  Building
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const SettingsPage: React.FC = () => {
  const { data, updateData } = useSchool();
  const { toast } = useToast();
  
  // Branding state
  const [schoolName, setSchoolName] = useState('School Manager');
  const [schoolMotto, setSchoolMotto] = useState('Excellence in Education');
  const [schoolAddress, setSchoolAddress] = useState('123 Education Street, Learning City');
  const [primaryColor, setPrimaryColor] = useState('#2563eb');
  
  // Class management state
  const [newClassName, setNewClassName] = useState('');
  const [newClassFee, setNewClassFee] = useState('');
  const [editingClass, setEditingClass] = useState<number | null>(null);

  const handleBrandingSave = () => {
    toast({
      title: "Branding Updated",
      description: "School branding has been saved successfully.",
    });
  };

  const handleAddClass = () => {
    if (!newClassName || !newClassFee) return;
    
    const newClass = {
      id: Math.max(...data.classes.map(c => c.id), 0) + 1,
      name: newClassName,
      amount: parseInt(newClassFee)
    };
    
    updateData({
      classes: [...data.classes, newClass]
    });
    
    setNewClassName('');
    setNewClassFee('');
    
    toast({
      title: "Class Added",
      description: `${newClassName} has been added successfully.`,
    });
  };

  const handleDeleteClass = (classId: number) => {
    const updatedClasses = data.classes.filter(c => c.id !== classId);
    updateData({
      classes: updatedClasses
    });
    
    toast({
      title: "Class Deleted",
      description: "Class has been removed successfully.",
    });
  };

  const handleUpdateClass = (classId: number, name: string, amount: number) => {
    const updatedClasses = data.classes.map(c => 
      c.id === classId ? { ...c, name, amount } : c
    );
    updateData({
      classes: updatedClasses
    });
    
    setEditingClass(null);
    toast({
      title: "Class Updated",
      description: "Class details have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
          <Settings className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage school settings and configuration</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Custom Branding */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Palette className="h-5 w-5 mr-2" />
              Custom Branding
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="schoolName">School Name</Label>
              <Input
                id="schoolName"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                placeholder="Enter school name"
              />
            </div>
            
            <div>
              <Label htmlFor="schoolMotto">School Motto</Label>
              <Input
                id="schoolMotto"
                value={schoolMotto}
                onChange={(e) => setSchoolMotto(e.target.value)}
                placeholder="Enter school motto"
              />
            </div>
            
            <div>
              <Label htmlFor="schoolAddress">School Address</Label>
              <Textarea
                id="schoolAddress"
                value={schoolAddress}
                onChange={(e) => setSchoolAddress(e.target.value)}
                placeholder="Enter school address"
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="primaryColor">Primary Color</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="primaryColor"
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-16 h-10 p-1"
                />
                <Input
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  placeholder="#2563eb"
                  className="flex-1"
                />
              </div>
            </div>
            
            <Button onClick={handleBrandingSave} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Save Branding
            </Button>
          </CardContent>
        </Card>

        {/* Database Configuration */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="h-5 w-5 mr-2" />
              Database Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="font-medium mb-2">Current Setup</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Currently using local state storage. For persistent data storage, 
                connect to Supabase for a full database solution.
              </p>
              <Button variant="outline" className="w-full">
                Connect to Supabase
              </Button>
            </div>
            
            <div className="space-y-2">
              <Label>Database Status</Label>
              <Badge variant="secondary">Local Storage</Badge>
            </div>
            
            <div className="space-y-2">
              <Label>Total Records</Label>
              <div className="text-sm text-muted-foreground">
                <p>Students: {data.students.length}</p>
                <p>Classes: {data.classes.length}</p>
                <p>Staff: {data.staff.length}</p>
                <p>Payments: {data.payments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Class Management */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <GraduationCap className="h-5 w-5 mr-2" />
              Class Management
            </div>
            <Badge variant="outline">{data.classes.length} classes</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add New Class */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
            <Input
              placeholder="Class name (e.g., Grade 1)"
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
            />
            <Input
              placeholder="Annual fee (₹)"
              type="number"
              value={newClassFee}
              onChange={(e) => setNewClassFee(e.target.value)}
            />
            <Button onClick={handleAddClass} disabled={!newClassName || !newClassFee}>
              <Plus className="h-4 w-4 mr-2" />
              Add Class
            </Button>
          </div>

          {/* Classes List */}
          <div className="space-y-2">
            {data.classes.map((cls) => (
              <div key={cls.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                {editingClass === cls.id ? (
                  <ClassEditForm
                    cls={cls}
                    onSave={handleUpdateClass}
                    onCancel={() => setEditingClass(null)}
                  />
                ) : (
                  <>
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="font-medium">{cls.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Annual fee: ₹{cls.amount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingClass(cls.id)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteClass(cls.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Helper component for editing classes
const ClassEditForm: React.FC<{
  cls: { id: number; name: string; amount: number };
  onSave: (id: number, name: string, amount: number) => void;
  onCancel: () => void;
}> = ({ cls, onSave, onCancel }) => {
  const [name, setName] = useState(cls.name);
  const [amount, setAmount] = useState(cls.amount.toString());

  const handleSave = () => {
    if (name && amount) {
      onSave(cls.id, name, parseInt(amount));
    }
  };

  return (
    <div className="flex items-center space-x-2 flex-1">
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="flex-1"
      />
      <Input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        type="number"
        className="w-32"
      />
      <Button size="sm" onClick={handleSave}>
        <Save className="h-3 w-3" />
      </Button>
      <Button variant="outline" size="sm" onClick={onCancel}>
        Cancel
      </Button>
    </div>
  );
};