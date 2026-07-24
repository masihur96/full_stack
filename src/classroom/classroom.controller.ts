import { Controller, Post,Get,Body,Patch,Param,Delete,NotFoundException } from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { CreateClassDto } from './dto/create-claass.dto';    

@Controller('classroom')
export class ClassroomController {

    constructor(private readonly classroomService: ClassroomService) {}

    @Post()
    createClassroom(@Body() createClassDto: CreateClassDto) {
        const data = this.classroomService.createClassroom(createClassDto);
        return {message:"Classroom created successfully", data};
    
    }

    @Get()
    getAllClassrooms() {
        const data = this.classroomService.getAllClassrooms();
        return {message:"Classrooms fetched successfully", data};
    }

    @Get(':id')
    getClassroomById(@Param('id') id: String) {
        const data = this.classroomService.getClassroomById(Number(id));
        if (!data) {
            throw new NotFoundException(`Classroom with ID ${id} not found`);
        }
        return {message:"Classroom fetched successfully", data};
    }

    @Patch(':id')
    updateClassroom(@Param('id') id: string, @Body() updateData: any) {
        const data = this.classroomService.update(Number(id), updateData);
        if (!data) {
            throw new NotFoundException(`Classroom with ID ${id} not found`);
        }
        return {message:"Classroom updated successfully", data};
    }

    @Delete(':id')
    removeClassroom(@Param('id') id: string) {
        const data = this.classroomService.remove(Number(id));
        if (!data) {
            throw new NotFoundException(`Classroom with ID ${id} not found`);
        }
        return {message:"Classroom removed successfully", data};
    }

}
