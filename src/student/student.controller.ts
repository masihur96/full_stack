import { Controller, Get, Post, Body,Patch,Delete,Param } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';

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
  createStudent(@Body() newStudent: CreateStudentDto) {
    const data = this.studentService.createStudent(newStudent);
    return {
      message: 'Student created successfully',
      data: data
    };
  }

  // URL: http://localhost:3000/students/1 (PATCH Request)
  @Patch(':id')
  updateStudent(@Param('id') id: string, @Body() updateData: any) {
    const data = this.studentService.updateStudent(Number(id), updateData);
    
    if (!data) {
      return { message: 'Student not found', data: null };
    }
    return { message: 'Student updated successfully', data: data };
  }

  // URL: http://localhost:3000/students/1 (DELETE Request)
  @Delete(':id')
  deleteStudent(@Param('id') id: string) {
    const data = this.studentService.deleteStudent(Number(id));
    
    if (!data) {
      return { message: 'Student not found', data: null };
    }
    return { message: 'Student deleted successfully', data: data };
  }
}