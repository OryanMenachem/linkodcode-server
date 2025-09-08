import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { SupabaseService } from '../supabase/supabase.service';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  private readonly TABLE_NAME = 'posts';
  constructor(private readonly supabaseService: SupabaseService) {}

  async create(createPostDto: CreatePostDto) {
    const supabase = this.supabaseService.getClient();
    const {
      postTitle,
      postDescription,
      imgSrc,
      imgAlt,
      likesNumber,
    } = createPostDto;

    const { data: insertedPost, error } = await supabase
      .from(this.TABLE_NAME)
      .insert({
        postTitle,
        postDescription,
        imgSrc,
        imgAlt,
        likesNumber,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create player: ${error.message}`);
    }
    return insertedPost;
  }

  async findAll(): Promise<Post[]> {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase.from(this.TABLE_NAME).select('*');

    if (error) {
      throw new Error(`Failed to fetch players: ${error.message}`);
    }
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
