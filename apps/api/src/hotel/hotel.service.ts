import { Injectable, Logger } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { PrismaService } from '../prisma.service';
import { Hotel } from '@prisma/client';

@Injectable()
export class HotelService {
  private readonly logger = new Logger(HotelService.name);
  constructor(private prismaService: PrismaService) {
    this.logger.log('HotelService init');
  }

  create(createHotelDto: CreateHotelDto) {
    return 'This action adds a new hotel';
  }

  async findAll() {
    try {
      const hotels = (await this.prismaService.hotel.findMany()) as Hotel[];

      if (!hotels) return null;

      return hotels;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async findOne(id: string) {
    try {
      const hotel = (await this.prismaService.hotel.findUnique({
        where: { id },
      })) as Hotel;

      if (!hotel) return null;

      return hotel;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  update(id: number, updateHotelDto: UpdateHotelDto) {
    return `This action updates a #${id} hotel`;
  }

  remove(id: number) {
    return `This action removes a #${id} hotel`;
  }
}
