import { IsInt } from 'class-validator';

export class CreatePersonDto {
  name: string;
  @IsInt()
  age: number;
}
