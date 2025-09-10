import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(createUserDto: CreateUserDto): Promise<any> {
    try {
      const user = await this.usersService.findByCredentials(createUserDto);
      const token = this.generateToken(user);
      return token;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    try {
      const user = await this.usersService.create(createUserDto);

      const token = this.generateToken(user);
      return token;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  generateToken(user: User) {
    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };
    const token = this.jwtService.sign(payload);

    return token;
  }
}
