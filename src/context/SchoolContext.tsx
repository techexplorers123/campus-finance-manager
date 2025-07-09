import React, { createContext, useContext, useState, useEffect } from 'react';
import { SchoolData } from '@/types/school';

interface SchoolContextType {
  data: SchoolData;
  updateData: (updates: Partial<SchoolData>) => void;
  loading: boolean;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

export const useSchool = () => {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error('useSchool must be used within a SchoolProvider');
  }
  return context;
};

// Sample data for demonstration
const initialData: SchoolData = {
  classes: [
    { id: 1, name: 'Class 1', amount: 5000 },
    { id: 2, name: 'Class 2', amount: 5500 },
    { id: 3, name: 'Class 3', amount: 6000 },
  ],
  subClasses: [
    { id: 1, class_id: 1, label: 'A', class_teacher: 1 },
    { id: 2, class_id: 1, label: 'B', class_teacher: 2 },
    { id: 3, class_id: 2, label: 'A', class_teacher: 3 },
  ],
  subjects: [
    { id: 1, class_id: 1, subject_name: 'Mathematics' },
    { id: 2, class_id: 1, subject_name: 'English' },
    { id: 3, class_id: 1, subject_name: 'Science' },
  ],
  students: [
    {
      id: 1,
      name: 'John Doe',
      d_birth: '2010-05-15',
      gender: 'Male',
      phone: 1234567890,
      join_date: '2024-01-15',
      email: 'john.doe@email.com',
      class_id: 1,
      sub_class_id: 1,
    },
    {
      id: 2,
      name: 'Jane Smith',
      d_birth: '2011-03-20',
      gender: 'Female',
      phone: 9876543210,
      join_date: '2024-01-15',
      email: 'jane.smith@email.com',
      class_id: 1,
      sub_class_id: 2,
    },
  ],
  guardians: [
    {
      id: 1,
      name: 'Mr. Doe',
      phone_no: 1234567890,
      email: 'mr.doe@email.com',
      student_id: 1,
      relation: 'Father',
    },
  ],
  addresses: [
    {
      student_id: 1,
      line_one: '123 Main St',
      line_2: 'Apt 4B',
      line_3: null,
      city: 'New York',
      pin: 10001,
      state: 'NY',
      country: 'USA',
    },
  ],
  paymentModes: [
    { id: 1, name: 'Cash' },
    { id: 2, name: 'Card' },
    { id: 3, name: 'Bank Transfer' },
  ],
  payments: [
    {
      id: 1,
      student_id: 1,
      amount: 5000,
      date: '2024-01-15',
      description: 'Monthly fee',
      payment_for: 'Student Fee',
      mode: 1,
    },
  ],
  expenses: [
    {
      id: 1,
      amount: 15000,
      date: '2024-01-15',
      description: 'Teacher salary',
      mode: 3,
      staff_payroll_id: 1,
    },
  ],
  studentFees: [
    {
      id: 1,
      student_id: 1,
      amount: 5000,
      frequency: 'Monthly',
    },
  ],
  buses: [
    {
      id: 1,
      bus_no: 'BUS001',
      bus_driver: 4,
      bus_attendant: 5,
    },
  ],
  routes: [
    {
      id: 1,
      bus_id: 1,
      route_name: 'Downtown Route',
    },
  ],
  stops: [
    {
      id: 1,
      route_id: 1,
      stop_name: 'Main Square',
      stop_time: '08:00',
      stop_fee: 200,
    },
  ],
  studentTransport: [
    {
      student_id: 1,
      stop_id: 1,
    },
  ],
  books: [
    {
      id: 1,
      name: 'Math Textbook Grade 1',
      amount: 450,
      class_id: 1,
    },
  ],
  staffRoles: [
    { id: 1, title: 'Teacher', salary: 15000 },
    { id: 2, title: 'Driver', salary: 10000 },
    { id: 3, title: 'Attendant', salary: 8000 },
  ],
  staff: [
    {
      id: 1,
      name: 'Mrs. Johnson',
      gender: 'Female',
      d_birth: '1985-07-10',
      phone: 5551234567,
      email: 'johnson@school.edu',
      join_date: '2020-08-15',
      job_title_id: 1,
    },
  ],
  staffPayroll: [
    {
      id: 1,
      staff_id: 1,
      base_salary: 15000,
      allowances: 2000,
      overtime: 1000,
      bonus: 500,
      deductions: 1500,
      advance: 0,
      reimbursements: 200,
      net_salary: 17200,
    },
  ],
  discounts: [],
  timetable: [
    {
      id: 1,
      day: 'Monday',
      period: 1,
      start_time: '09:00',
      end_time: '10:00',
      subject_id: 1,
      teacher_id: 1,
      class_id: 1,
      sub_class_id: 1,
    },
    {
      id: 2,
      day: 'Monday',
      period: 2,
      start_time: '10:00',
      end_time: '11:00',
      subject_id: 2,
      teacher_id: 1,
      class_id: 1,
      sub_class_id: 1,
    },
    {
      id: 3,
      day: 'Tuesday',
      period: 1,
      start_time: '09:00',
      end_time: '10:00',
      subject_id: 3,
      teacher_id: 1,
      class_id: 1,
      sub_class_id: 1,
    },
  ],
};

export const SchoolProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SchoolData>(initialData);
  const [loading, setLoading] = useState(false);

  const updateData = (updates: Partial<SchoolData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  return (
    <SchoolContext.Provider value={{ data, updateData, loading }}>
      {children}
    </SchoolContext.Provider>
  );
};