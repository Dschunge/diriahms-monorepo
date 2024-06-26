import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HotelModule } from './hotel/hotel.module';
import { MqttModule } from './mqtt/mqtt.module';
import { RoomModule } from './room/room.module';

@Module({
  imports: [HotelModule, MqttModule, RoomModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
