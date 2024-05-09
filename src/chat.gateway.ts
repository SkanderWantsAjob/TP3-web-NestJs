import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";

@WebSocketGateway({ cors: {
    origin: ["http://localhost:3000","null"], // Remplacez par l'origine correcte
    credentials: true
  }})
export class ChatGateway{
    @WebSocketServer() 
    server;
    @SubscribeMessage('message')
    handleMessage(@MessageBody()message :string): void {
        this.server.emit('message', message);
        //console.log(message);
    }
}