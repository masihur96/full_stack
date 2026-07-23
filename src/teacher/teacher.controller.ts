import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('teachers')
export class TeacherController {
  // Mock database for teachers
  private teachers = [
    { id: 1, name: 'Mr. Smith', subject: 'Math' },
    { id: 2, name: 'Mrs. Davis', subject: 'Science' },
    { id: 3, name: 'Ms. Johnson', subject: 'Math' },
  ];

  // 1. Using @Query to filter teachers
  // URL: http://localhost:3000/teachers?subject=Math
  @Get()
  getTeachers(@Query('subject') subject: string) {
    if (subject) {
      // If a subject query is provided, filter the array
      const filteredTeachers = this.teachers.filter(
        (teacher) => teacher.subject.toLowerCase() === subject.toLowerCase()
      );
      return {
        message: `Fetched teachers for subject: ${subject}`,
        data: filteredTeachers,
      };
    }

    // If no query is provided, return everyone
    return {
      message: 'Fetched all teachers',
      data: this.teachers,
    };
  }

  // 2. Using @Param to fetch a single teacher by ID
  // URL: http://localhost:3000/teachers/1
  @Get(':id')
  getTeacherById(@Param('id') id: string) {
    // Note: URL parameters are always strings, so we convert it to a Number
    const teacher = this.teachers.find((t) => t.id === Number(id));

    if (!teacher) {
      return {
        message: 'Teacher not found',
        data: null,
      };
    }

    return {
      message: 'Successfully fetched teacher',
      data: teacher,
    };
  }
}