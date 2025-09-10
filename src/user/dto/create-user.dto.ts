import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  role: 'admin' | 'user';

  @IsString()
  @IsNotEmpty()
  password: string;
}
