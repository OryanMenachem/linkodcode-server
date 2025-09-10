import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsOptional()
  role: 'admin' | 'user';

  @IsString()
  @IsNotEmpty()
  password: string;
}
