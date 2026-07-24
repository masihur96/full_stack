import {IsString, IsNotEmpty, IsNumber, IsInt, IsIn} from "class-validator";

export class CreateClassDto {
  @IsString()
  @IsNotEmpty()
  roomNumber!: string;

  @IsNumber()
  @IsNotEmpty()
  capacity?: number;

  @IsString()
  @IsIn(['Lecture', 'Lab', 'Art'])
  type!: string;
}   