import { Injectable, Logger } from '@nestjs/common';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { PrismaService } from 'src/prisma.service';
import { TourWithPriceCategories } from 'src/types/hotelTypes';
import { Tour } from '@prisma/client';

@Injectable()
export class TourService {
  private readonly logger = new Logger(TourService.name);
  constructor(private prismaService: PrismaService) {
    this.logger.log('TourService init');
  }
  create(createTourDto: CreateTourDto) {
    return 'This action adds a new tour';
  }

  findAll1() {
    return `This action returns all tour`;
  }

  async findAll() {
    try {
      const rooms = (await this.prismaService.tour.findMany({
        include: { pricecategory: true },
      })) as Tour[];

      if (!rooms) return null;

      return rooms;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} tour`;
  }

  update(id: number, updateTourDto: UpdateTourDto) {
    return `This action updates a #${id} tour`;
  }

  remove(id: number) {
    return `This action removes a #${id} tour`;
  }
}
