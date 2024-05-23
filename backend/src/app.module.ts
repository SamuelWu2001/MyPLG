import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

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
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
