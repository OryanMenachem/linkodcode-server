import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './supabase/supabase.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import * as Joi from 'joi';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        SUPABASE_URI: Joi.string().uri().required(),
        SUPABASE_ANON_KEY: Joi.string().required(),
      }),
    }),

    PostModule,

    SupabaseModule,

    AuthModule,

    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
