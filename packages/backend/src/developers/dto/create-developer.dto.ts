import { IsArray, IsInt, IsString } from 'class-validator';

export class CreateDeveloperDto {
  @IsString()
  name: string;
  @IsInt()
  age: number;
  @IsArray()
  hobby: string[];
}
