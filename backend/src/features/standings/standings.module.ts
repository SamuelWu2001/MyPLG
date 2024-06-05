import { Module } from '@nestjs/common';
import { StandingsController } from './standings.controller';
import { StandingsService } from './standings.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Standings, StandingsSchema } from './standings.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Standings.name, schema: StandingsSchema}]),
  ],
  controllers: [StandingsController],
  providers: [StandingsService],
  exports: [StandingsService]
})
export class StandingsModule {}
