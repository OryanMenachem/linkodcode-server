import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { SupabaseService } from '../supabase/supabase.service';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  private readonly TABLE_NAME = 'posts';
  constructor(private readonly supabaseService: SupabaseService) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const supabase = this.supabaseService.getClient();
    const {
      postTitle,
      postDescription,
      imgSrc,
      imgAlt,
      likesNumber,
      timestamp,
    } = createPostDto;

    const { data: insertedPost, error } = await supabase
      .from(this.TABLE_NAME)
      .insert({
        postTitle,
        postDescription,
        imgSrc,
        imgAlt,
        likesNumber,
        timestamp,
      })
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }


    return insertedPost;
  }

  async findAll(): Promise<Post[]> {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase.from(this.TABLE_NAME).select('*');

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async findOne(id: number) {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase
      .from(this.TABLE_NAME)
      .select('*')
      .eq('id', id)
      .single();
    if (error) {
      throw new Error(error.message);
    }
    console.log(data);

    return data;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
