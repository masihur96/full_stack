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

  createStudent(newStudent: any) {
    const student = {
      id: this.students.length + 1,
      ...newStudent
    };
    this.students.push(student);
    return student;
  }
}