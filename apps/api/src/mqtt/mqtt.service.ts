import { Injectable, Logger } from '@nestjs/common';
import { CLEANINSTATUS } from '@prisma/client';
import { connect } from 'mqtt';
import { RoomService } from 'src/room/room.service';

export enum MSGType {
  CLEANING = 'cleaning',
}

const isJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

@Injectable()
export class MqttService {
  private readonly logger = new Logger(MqttService.name);
  private mqttClient;

  constructor(private readonly roomService: RoomService) {}

  onModuleInit() {
    /*  const host = this.configService.get<string>('mgttbroker.host');
     const port = this.configService.get<string>('mgttbroker.port'); */
    const clientId = `mqtt_diriahms_server_` + Math.random();

    //const connectUrl = `mqtt://${host}:${port}`;

    const connectUrl2 = `mqtt://172.16.8.115:${1883}`;

    this.logger.log('Connect to MQTT Broker... ' + connectUrl2);

    this.mqttClient = connect(connectUrl2, {
      clientId,
      clean: true,
      connectTimeout: 4000,
      // username: this.configService.get<string>('mgttbroker.user'),
      // password: this.configService.get<string>('mgttbroker.password'),
      username: 'mqtt_user',
      password: '56Seiten',
      reconnectPeriod: 2000,
    });

    this.mqttClient.on('connect', () => {
      this.logger.log('Connect to MQTT Broker');
      this.mqttClient.subscribe(
        'zigbee2mqtt/4fec721f-aecd-47c9-bc9d-9066b312b5cc/800/cleaning',
        (err) => {
          if (!err) {
            //mqttClient.publish("presence", "Hello mqtt");
          } else {
            console.log('on subscribe error: ', err);
          }
        },
      );
    });

    this.mqttClient.on('connected', () => {
      this.logger.log('Connected to MQTT Broker');
    });

    this.mqttClient.on('error', (err) => {
      this.logger.log('Error in connecting to MQTT Broker: ' + err);
    });

    this.mqttClient.on('message', async (topic: string, _message: any) => {
      //console.log('topic: ', topic);
      //console.log('message: ', _message.toString());

      const topicparts = topic.split('/');
      //console.log(topicparts);
      const hotelId = topicparts[1];
      const roomNumber = topicparts[2];
      const type = topicparts[3];

      const message = _message.toString();

      /* console.log(
        'hotelId ' + hotelId + ' room: ' + roomNumber + ' type: ' + type,
      ); */

      switch (type) {
        case MSGType.CLEANING:
          if (isJsonString(message)) {
            const jsonObj = JSON.parse(message);
            const action = jsonObj.action;
            if (action && action !== '') {
              //console.log({ action });
              switch (action) {
                case '1_single':
                  console.log('clean');
                  const result = await this.roomService.updateCleaning(
                    hotelId,
                    roomNumber,
                    CLEANINSTATUS.CLEAN,
                  );
                  break;
                case '2_single':
                  console.log('do not distrurb');
                  const result1 = await this.roomService.updateCleaning(
                    hotelId,
                    roomNumber,
                    CLEANINSTATUS.DONOTDISTRUB,
                  );
                  break;
                case '3_single':
                  console.log('do not distrurb');
                  const result2 = await this.roomService.updateCleaning(
                    hotelId,
                    '103',
                    CLEANINSTATUS.CLEAN,
                  );
                  break;
                case '4_single':
                  console.log('do not distrurb');
                  const result3 = await this.roomService.updateCleaning(
                    hotelId,
                    '103',
                    CLEANINSTATUS.DONOTDISTRUB,
                  );
                  break;
              }
            }
          }
          break;
      }
    });
  }
}
