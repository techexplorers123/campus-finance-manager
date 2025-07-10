import Dexie, { Table } from 'dexie';
import { SchoolData } from '@/types/school';

export interface SchoolDB extends SchoolData {}

export class SchoolDatabase extends Dexie {
  classes!: Table<SchoolDB['classes'][0]>;
  subClasses!: Table<SchoolDB['subClasses'][0]>;
  subjects!: Table<SchoolDB['subjects'][0]>;
  students!: Table<SchoolDB['students'][0]>;
  guardians!: Table<SchoolDB['guardians'][0]>;
  addresses!: Table<SchoolDB['addresses'][0]>;
  paymentModes!: Table<SchoolDB['paymentModes'][0]>;
  payments!: Table<SchoolDB['payments'][0]>;
  expenses!: Table<SchoolDB['expenses'][0]>;
  studentFees!: Table<SchoolDB['studentFees'][0]>;
  buses!: Table<SchoolDB['buses'][0]>;
  routes!: Table<SchoolDB['routes'][0]>;
  stops!: Table<SchoolDB['stops'][0]>;
  studentTransport!: Table<SchoolDB['studentTransport'][0]>;
  books!: Table<SchoolDB['books'][0]>;
  staffRoles!: Table<SchoolDB['staffRoles'][0]>;
  staff!: Table<SchoolDB['staff'][0]>;
  staffPayroll!: Table<SchoolDB['staffPayroll'][0]>;
  discounts!: Table<SchoolDB['discounts'][0]>;
  timetable!: Table<SchoolDB['timetable'][0]>;

  constructor() {
    super('SchoolDatabase');
    
    this.version(1).stores({
      classes: '++id, name, amount',
      subClasses: '++id, class_id, label, class_teacher',
      subjects: '++id, class_id, subject_name',
      students: '++id, name, d_birth, gender, phone, join_date, email, class_id, sub_class_id',
      guardians: '++id, name, phone_no, email, student_id, relation',
      addresses: 'student_id, line_one, line_2, line_3, city, pin, state, country',
      paymentModes: '++id, name',
      payments: '++id, student_id, amount, date, description, payment_for, mode',
      expenses: '++id, amount, date, description, mode, staff_payroll_id',
      studentFees: '++id, student_id, amount, frequency',
      buses: '++id, bus_no, bus_driver, bus_attendant',
      routes: '++id, bus_id, route_name',
      stops: '++id, route_id, stop_name, stop_time, stop_fee',
      studentTransport: 'student_id, stop_id',
      books: '++id, name, amount, class_id',
      staffRoles: '++id, title, salary',
      staff: '++id, name, gender, d_birth, phone, email, join_date, job_title_id',
      staffPayroll: '++id, staff_id, base_salary, allowances, overtime, bonus, deductions, advance, reimbursements, net_salary',
      discounts: '++id, student_id, payment_id, discount_type, amount, description',
      timetable: '++id, day, period, start_time, end_time, subject_id, teacher_id, class_id, sub_class_id'
    });
  }

  async initializeWithSampleData(sampleData: SchoolData) {
    // Check if data already exists
    const classCount = await this.classes.count();
    if (classCount > 0) return;

    // Initialize with sample data
    await this.transaction('rw', [
      this.classes, this.subClasses, this.subjects, this.students,
      this.guardians, this.addresses, this.paymentModes, this.payments,
      this.expenses, this.studentFees, this.buses, this.routes,
      this.stops, this.studentTransport, this.books, this.staffRoles,
      this.staff, this.staffPayroll, this.discounts, this.timetable
    ], async () => {
      await this.classes.bulkAdd(sampleData.classes);
      await this.subClasses.bulkAdd(sampleData.subClasses);
      await this.subjects.bulkAdd(sampleData.subjects);
      await this.students.bulkAdd(sampleData.students);
      await this.guardians.bulkAdd(sampleData.guardians);
      await this.addresses.bulkAdd(sampleData.addresses);
      await this.paymentModes.bulkAdd(sampleData.paymentModes);
      await this.payments.bulkAdd(sampleData.payments);
      await this.expenses.bulkAdd(sampleData.expenses);
      await this.studentFees.bulkAdd(sampleData.studentFees);
      await this.buses.bulkAdd(sampleData.buses);
      await this.routes.bulkAdd(sampleData.routes);
      await this.stops.bulkAdd(sampleData.stops);
      await this.studentTransport.bulkAdd(sampleData.studentTransport);
      await this.books.bulkAdd(sampleData.books);
      await this.staffRoles.bulkAdd(sampleData.staffRoles);
      await this.staff.bulkAdd(sampleData.staff);
      await this.staffPayroll.bulkAdd(sampleData.staffPayroll);
      await this.discounts.bulkAdd(sampleData.discounts);
      await this.timetable.bulkAdd(sampleData.timetable);
    });
  }

  async getAllData(): Promise<SchoolData> {
    return {
      classes: await this.classes.toArray(),
      subClasses: await this.subClasses.toArray(),
      subjects: await this.subjects.toArray(),
      students: await this.students.toArray(),
      guardians: await this.guardians.toArray(),
      addresses: await this.addresses.toArray(),
      paymentModes: await this.paymentModes.toArray(),
      payments: await this.payments.toArray(),
      expenses: await this.expenses.toArray(),
      studentFees: await this.studentFees.toArray(),
      buses: await this.buses.toArray(),
      routes: await this.routes.toArray(),
      stops: await this.stops.toArray(),
      studentTransport: await this.studentTransport.toArray(),
      books: await this.books.toArray(),
      staffRoles: await this.staffRoles.toArray(),
      staff: await this.staff.toArray(),
      staffPayroll: await this.staffPayroll.toArray(),
      discounts: await this.discounts.toArray(),
      timetable: await this.timetable.toArray(),
    };
  }

  async syncData(data: Partial<SchoolData>) {
    await this.transaction('rw', [
      this.classes, this.subClasses, this.subjects, this.students,
      this.guardians, this.addresses, this.paymentModes, this.payments,
      this.expenses, this.studentFees, this.buses, this.routes,
      this.stops, this.studentTransport, this.books, this.staffRoles,
      this.staff, this.staffPayroll, this.discounts, this.timetable
    ], async () => {
      if (data.classes) {
        await this.classes.clear();
        await this.classes.bulkAdd(data.classes);
      }
      if (data.students) {
        await this.students.clear();
        await this.students.bulkAdd(data.students);
      }
      // Add other tables as needed
    });
  }
}

export const db = new SchoolDatabase();