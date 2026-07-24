import { IsString, IsNotEmpty, IsIn } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  grade!: string;

  // This ensures the status can ONLY be one of these three exact strings
  @IsString()
  @IsIn(['Enrolled', 'Pending', 'Graduated'])
  status!: string;
}