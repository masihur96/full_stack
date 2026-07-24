import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { ClassroomModule } from './classroom/classroom.module';

@Module({
  imports: [StudentModule, TeacherModule, ClassroomModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
