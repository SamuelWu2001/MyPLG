import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsModule } from './news/news.module';
import * as dotenv from 'dotenv';
import { APP_PIPE } from '@nestjs/core';

dotenv.config({ path: 'development.env'});

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   load: [MongoConfigFactory, SecretConfigFactory],
    //   envFilePath: '../development.env',
    //   isGlobal: true
    // }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async(config:ConfigService) => ({
        uri: config.get<string>('mongo.uri')
      })
    }),
    NewsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    } 
  ],
})
export class AppModule {}
