import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { MqttController } from './mqtt.controller';
import { PrismaService } from '../prisma.service';
import { RoomService } from 'src/room/room.service';

@Module({
  controllers: [MqttController],
  providers: [MqttService, PrismaService, RoomService],
})
export class MqttModule {}
