import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  postTitle: string;

  @IsString()
  @IsNotEmpty()
  postDescription: string;

  @IsString()
  @IsNotEmpty()
  imgSrc: string;

  @IsString()
  @IsNotEmpty()
  imgAlt: string;

  @IsNumber()
  @IsNotEmpty()
  likesNumber: number;
}
