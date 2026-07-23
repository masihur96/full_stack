import { Controller, Get, Post, Body } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('students')
export class StudentController {
  // Dependency Injection: NestJS automatically creates the service and assigns it to 'studentService'
  constructor(private readonly studentService: StudentService) {}

  @Get()
  getAllStudents() {
    const data = this.studentService.getAllStudents();
    return {
      message: 'Successfully fetched all students',
      data: data
    };
  }

  @Post()
  createStudent(@Body() newStudent: any) {
    const data = this.studentService.createStudent(newStudent);
    return {
      message: 'Student created successfully',
      data: data
    };
  }
}