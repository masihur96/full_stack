import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';

@Injectable()
export class ExamService {
  constructor(private prisma: PrismaService) {}

  // CREATE a new exam
  async create(createExamDto: CreateExamDto) {
    return this.prisma.exam.create({
      data: {
        title: createExamDto.title,
        description: createExamDto.description,
        date: new Date(createExamDto.date), // Convert string to Date object
        teacherId: createExamDto.teacherId,
      },
    });
  }

  // READ all exams
  async findAll() {
    return this.prisma.exam.findMany({
      include: {
        teacher: {
          select: { name: true, email: true } // Fetch the teacher's details alongside the exam
        }
      }
    });
  }

  // READ a single exam by ID
  async findOne(id: number) {
    const exam = await this.prisma.exam.findUnique({
      where: { id },
      include: { teacher: true, students: true },
    });
    if (!exam) throw new NotFoundException(`Exam with ID ${id} not found`);
    return exam;
  }

  // UPDATE an exam
  async update(id: number, updateExamDto: UpdateExamDto) {
    return this.prisma.exam.update({
      where: { id },
      data: {
        ...(updateExamDto.title && { title: updateExamDto.title }),
        ...(updateExamDto.description && { description: updateExamDto.description }),
        ...(updateExamDto.date && { date: new Date(updateExamDto.date) }),
      },
    });
  }

  // DELETE an exam
  async remove(id: number) {
    return this.prisma.exam.delete({
      where: { id },
    });
  }

  // ENROLL A STUDENT IN AN EXAM
  async enrollStudent(examId: number, studentId: number) {
    return this.prisma.exam.update({
      where: { id: examId },
      data: {
        students: {
          connect: { id: studentId }, // This automatically links the two records!
        },
      },
      include: {
        students: true, // Return the updated list of students
      },
    });
  }


  // ADVANCED QUERY: Fetch all exams for a specific student
  async findExamsByStudent(studentId: number) {
    return this.prisma.exam.findMany({
      where: {
        students: {
          some: {
            id: studentId, // Finds any exam where this student ID exists in the students list
          },
        },
      },
      include: {
        teacher: {
          select: { name: true }, // Extra touch: grab the teacher's name so the student knows who made it
        },
      },
    });
  }
}