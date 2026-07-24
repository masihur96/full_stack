import { Injectable } from '@nestjs/common';

@Injectable()
export class ClassroomService {

private classrooms = [{ id: 1, roomNumber: '101', capacity: 101, type: 'Lecture' }];

  createClassroom(createClassroomDto: any) {
    const classroom = { ...createClassroomDto, id: this.classrooms.length + 1 };
    this.classrooms.push(classroom);
    return classroom;
  }

  getAllClassrooms() {
    return this.classrooms;
  }

  getClassroomById(id: number,updateData?: any) {
    return this.classrooms.find(classroom => classroom.id === id);
  }

update(id: number, updateData: any) {
    const index = this.classrooms.findIndex(c => c.id === id);
    if (index > -1) {
      this.classrooms[index] = { ...this.classrooms[index], ...updateData };
      return this.classrooms[index];
    }
    return null;
  }

  remove(id: number) {
    const index = this.classrooms.findIndex(c => c.id === id);
    if (index > -1) {
      return this.classrooms.splice(index, 1)[0];
    }
    return null;
  }


}
