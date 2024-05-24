import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsModule } from './features/news/news.module';
import { APP_PIPE } from '@nestjs/core';
import { MongoConfigFactory } from './config';
import * as dotenv from 'dotenv';


dotenv.config({ path: 'development.env'});

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [MongoConfigFactory],
      envFilePath: '../development.env',
      isGlobal: true
    }),
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
