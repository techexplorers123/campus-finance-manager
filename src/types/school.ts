export interface Class {
  id: number;
  name: string;
  amount: number;
}

export interface SubClass {
  id: number;
  class_id: number;
  label: string;
  class_teacher: number | null;
}

export interface Subject {
  id: number;
  class_id: number;
  subject_name: string;
}

export interface Student {
  id: number;
  name: string;
  d_birth: string;
  gender: 'Male' | 'Female' | 'Other';
  phone: number | null;
  join_date: string;
  email: string | null;
  class_id: number;
  sub_class_id: number;
}

export interface Guardian {
  id: number;
  name: string;
  phone_no: number;
  email: string | null;
  student_id: number;
  relation: string;
}

export interface StudentAddress {
  student_id: number;
  line_one: string;
  line_2: string | null;
  line_3: string | null;
  city: string;
  pin: number;
  state: string;
  country: string;
}

export interface PaymentMode {
  id: number;
  name: string;
}

export interface Payment {
  id: number;
  student_id: number | null;
  amount: number;
  date: string;
  description: string;
  payment_for: 'Student Fee' | 'Donation' | 'Event' | 'Sponsorship' | 'Other';
  mode: number;
}

export interface Expense {
  id: number;
  amount: number;
  date: string;
  description: string;
  mode: number;
  staff_payroll_id: number | null;
}

export interface StudentFee {
  id: number;
  student_id: number;
  amount: number;
  frequency: 'Monthly' | 'Yearly' | 'One-Time';
}

export interface Bus {
  id: number;
  bus_no: string;
  bus_driver: number | null;
  bus_attendant: number | null;
}

export interface Route {
  id: number;
  bus_id: number;
  route_name: string;
}

export interface Stop {
  id: number;
  route_id: number;
  stop_name: string;
  stop_time: string;
  stop_fee: number;
}

export interface StudentTransport {
  student_id: number;
  stop_id: number;
}

export interface Book {
  id: number;
  name: string;
  amount: number;
  class_id: number;
}

export interface StaffRole {
  id: number;
  title: string;
  salary: number;
}

export interface Staff {
  id: number;
  name: string;
  gender: 'Male' | 'Female' | 'Other';
  d_birth: string | null;
  phone: number | null;
  email: string | null;
  join_date: string;
  job_title_id: number | null;
}

export interface StaffPayroll {
  id: number;
  staff_id: number;
  base_salary: number;
  allowances: number;
  overtime: number;
  bonus: number;
  deductions: number;
  advance: number;
  reimbursements: number;
  net_salary: number;
}

export interface Discount {
  id: number;
  student_id: number;
  payment_id: number;
  discount_type: 'Fixed' | 'Percentage';
  amount: number;
  description: string;
}

export interface TimeSlot {
  id: number;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  period: number;
  start_time: string;
  end_time: string;
  subject_id: number;
  teacher_id: number;
  class_id: number;
  sub_class_id: number;
}

export interface SchoolData {
  classes: Class[];
  subClasses: SubClass[];
  subjects: Subject[];
  students: Student[];
  guardians: Guardian[];
  addresses: StudentAddress[];
  paymentModes: PaymentMode[];
  payments: Payment[];
  expenses: Expense[];
  studentFees: StudentFee[];
  buses: Bus[];
  routes: Route[];
  stops: Stop[];
  studentTransport: StudentTransport[];
  books: Book[];
  staffRoles: StaffRole[];
  staff: Staff[];
  staffPayroll: StaffPayroll[];
  discounts: Discount[];
  timetable: TimeSlot[];
}