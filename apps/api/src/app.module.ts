import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HotelModule } from './hotel/hotel.module';
import { MqttModule } from './mqtt/mqtt.module';
import { RoomModule } from './room/room.module';
import { TourModule } from './tour/tour.module';

@Module({
  imports: [HotelModule, MqttModule, RoomModule, TourModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
