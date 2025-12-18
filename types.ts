
export enum UserRole {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT'
}

export enum UserStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  LATE = 'LATE'
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  classId?: string;
  className?: string;
}

export interface SchoolClass {
  id: string;
  name: string;
  level: string;
}

export interface Subject {
  id: string;
  name: string;
}

export interface Homework {
  id: string;
  title: string;
  description: string;
  attachmentUrl?: string;
  dueDate: string;
  classId: string;
  teacherId: string;
  submissionsCount: number;
}

export interface Submission {
  id: string;
  studentId: string;
  studentName: string;
  homeworkId: string;
  fileUrl: string;
  grade?: number;
  feedback?: string;
  submittedAt: string;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  status: AttendanceStatus;
  studentId: string;
  classId: string;
}

export interface SchoolEvent {
  id: string;
  title: string;
  date: string;
  type: 'HOLIDAY' | 'EXAM' | 'MEETING';
  color?: string;
}
