import { Injectable } from '@nestjs/common';

@Injectable()
export class StudentService {
  private students = [
    { id: 1, name: 'Aisha Rahman', grade: '10th', status: 'Enrolled' },
    { id: 2, name: 'Rahul Sharma', grade: '11th', status: 'Enrolled' }
  ];

  getAllStudents() {
    return this.students;
  }
// Fetch a single student by ID
  getStudentById(id: number) {
    return this.students.find((s) => s.id === id);
  }
  createStudent(newStudent: any) {
    const student = {
      id: this.students.length + 1,
      ...newStudent
    };
    this.students.push(student);
    return student;
  }

  // স্টুডেন্টের তথ্য আপডেট করা
  updateStudent(id: number, updatedData: any) {
    const studentIndex = this.students.findIndex((s) => s.id === id);
    
    if (studentIndex > -1) {
      // আগের ডেটার সাথে নতুন ডেটা মার্জ (merge) করা হচ্ছে
      this.students[studentIndex] = { ...this.students[studentIndex], ...updatedData };
      return this.students[studentIndex];
    }
    return null; // স্টুডেন্ট পাওয়া না গেলে
  }

  // স্টুডেন্ট ডিলিট করা
  deleteStudent(id: number) {
    const studentIndex = this.students.findIndex((s) => s.id === id);
    
    if (studentIndex > -1) {
      const deletedStudent = this.students.splice(studentIndex, 1);
      return deletedStudent[0];
    }
    return null;
  }
}