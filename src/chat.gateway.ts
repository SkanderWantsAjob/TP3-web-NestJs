import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

import { MessageDto } from './Message/Message.dto';
@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server;
  private logger = new Logger('ChatGateway');

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: MessageDto): MessageDto {
    this.logger.log(`Message received: ${message.author} - ${message.body}`);
    this.server.emit('message', message);
    return message;
  }
  handleConnection(socket: Socket) {
    this.logger.log(`Socket connected: ${socket.id}`);
  }
  handleDisconnect(socket: Socket) {
    this.logger.log(`Socket disconnected: ${socket.id}`);
  }
}
