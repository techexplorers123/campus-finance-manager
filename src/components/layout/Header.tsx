import React, { useState } from 'react';
import { Menu, Bell, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useSchool } from '@/context/SchoolContext';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { data } = useSchool();
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleGlobalSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const results: any[] = [];
    
    // Search students
    data.students.forEach(student => {
      const age = new Date().getFullYear() - new Date(student.d_birth).getFullYear();
      const address = data.addresses.find(addr => addr.student_id === student.id);
      const guardian = data.guardians.find(g => g.student_id === student.id);
      const addressStr = address ? `${address.city}, ${address.state}` : '';
      const guardianStr = guardian ? `${guardian.name} (${guardian.relation})` : '';
      
      if (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.phone?.toString().includes(searchTerm) ||
          age.toString().includes(searchTerm) ||
          addressStr.toLowerCase().includes(searchTerm.toLowerCase()) ||
          guardianStr.toLowerCase().includes(searchTerm.toLowerCase())) {
        results.push({
          type: 'Student',
          name: student.name,
          details: `${student.email} - Age: ${age}`,
          link: '/students'
        });
      }
    });

    // Search staff
    data.staff.forEach(staff => {
      const role = data.staffRoles.find(r => r.id === staff.job_title_id);
      if (staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          staff.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          staff.phone?.toString().includes(searchTerm) ||
          role?.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        results.push({
          type: 'Staff',
          name: staff.name,
          details: `${staff.email} - ${role?.title || 'N/A'}`,
          link: '/staff'
        });
      }
    });

    setSearchResults(results.slice(0, 10));
    setShowResults(true);
  };
  return (
    <header className="h-16 bg-card border-b border-border px-4 flex items-center justify-between shadow-soft">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Global search: name, age, phone, address..."
            className="pl-10 w-80"
            onChange={(e) => handleGlobalSearch(e.target.value)}
            onFocus={() => setShowResults(true)}
            onBlur={() => setTimeout(() => setShowResults(false), 200)}
          />
          {showResults && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-card border border-border rounded-md shadow-lg mt-1 max-h-64 overflow-y-auto z-50">
              {searchResults.map((result, index) => (
                <div 
                  key={index}
                  className="p-3 hover:bg-muted/50 cursor-pointer border-b border-border last:border-b-0"
                  onClick={() => window.location.href = result.link}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{result.name}</p>
                      <p className="text-xs text-muted-foreground">{result.details}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">{result.type}</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
            3
          </Badge>
        </Button>
        
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};