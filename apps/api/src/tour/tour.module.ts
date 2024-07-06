import { Module } from '@nestjs/common';
import { TourService } from './tour.service';
import { TourController } from './tour.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [TourController],
  providers: [TourService, PrismaService],
})
export class TourModule {}
