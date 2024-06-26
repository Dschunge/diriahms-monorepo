import { Injectable, Logger } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PrismaService } from 'src/prisma.service';
import { CLEANINSTATUS, Room } from '@prisma/client';
import { RoomWithCleanings } from 'src/types/hotelTypes';

@Injectable()
export class RoomService {
  private readonly logger = new Logger(RoomService.name);
  constructor(private prismaService: PrismaService) {
    this.logger.log('RoomService init');
  }
  create(createRoomDto: CreateRoomDto) {
    return 'This action adds a new room';
  }

  async findAll() {
    try {
      const rooms = (await this.prismaService.room.findMany({
        include: { cleaning: true, category: true },
      })) as Room[];

      if (!rooms) return null;

      return rooms;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async findOne(id: string) {
    try {
      const room = (await this.prismaService.room.findUnique({
        where: { id },
      })) as Room;

      if (!room) return null;

      return room;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }

  /* 
    CLEANING QUERIES START
  */

  async findCleaningsByRoomNumberAndHotelId(
    hotelId: string,
    roomnumber: number,
  ) {
    try {
      const room = (await this.prismaService.room.findFirst({
        where: { roomnumber, hotelId },
        include: {
          cleaning: true,
        },
      })) as RoomWithCleanings;

      if (!room) return null;

      return room;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async findRoomCleaningsByHotelId(id: string) {
    try {
      const rooms = (await this.prismaService.room.findMany({
        where: { hotelId: id },
        include: { cleaning: { take: 1 } },
      })) as RoomWithCleanings[];

      if (!rooms) return null;

      return rooms;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async createCleaning(roomId: string, status: CLEANINSTATUS) {
    try {
      const cleaning = await this.prismaService.cleaning.create({
        data: {
          message: '',
          whatToBring: [''],
          status,
          cleaningRequest: new Date(),
          /* cleaningStart: null,
          cleaningEnd: null, */
          finished: false,
          openTasks: [''],
          roomId,
        },
      });
      return cleaning;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async updateCleaningStatus(id: string, status: CLEANINSTATUS) {
    try {
      const cleaning = await this.prismaService.cleaning.update({
        where: { id },
        data: {
          status,
        },
      });
      return cleaning;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async updateCleaning(
    hotelId: string,
    roomNumber: string,
    status: CLEANINSTATUS,
  ) {
    const room = await this.findCleaningsByRoomNumberAndHotelId(
      hotelId,
      Number(roomNumber),
    );
    const cleanings = room.cleaning;
    const unfinishedCleaning = cleanings.find(
      (cleaning) => cleaning.finished === false,
    );

    if (unfinishedCleaning) {
      try {
        const cleaning = await this.prismaService.cleaning.update({
          where: { id: unfinishedCleaning.id },
          data: {
            status,
            cleaningRequest: new Date(),
          },
        });
        return cleaning;
      } catch (error: any) {
        throw new Error(error);
      }
    } else {
      console.log('no unfinished cleaning found');
      const createcleaningresult = this.createCleaning(room.id, status);
    }
  }

  /* 
    CLEANING QUERIES END
  */
}
