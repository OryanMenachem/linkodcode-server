import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SupabaseService } from 'src/supabase/supabase.service';
import { User } from './entities/user.entity';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly TABLE_NAME = 'users';
  constructor(private readonly supabaseService: SupabaseService) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const supabase = this.supabaseService.getClient();
    const { username, role, password } = createUserDto;
    const hashed_password = await bcrypt.hash(password, 10);
    const { data: insertedUser, error } = await supabase
      .from(this.TABLE_NAME)
      .insert({
        username,
        role,
        hashed_password,
      })
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return insertedUser;
  }

  async findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
