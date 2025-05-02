// src/kanban/kanban.gateway.ts
import { WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect, } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
      origin: 'http://localhost:3000', // Reemplaza con la URL de tu frontend
      credentials: true,
    },
    namespace: 'kanban',
  })
  export class KanbanGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
  
    handleConnection(client: Socket) {
      console.log(`Cliente conectado: ${client.id}`);
    }
  
    handleDisconnect(client: Socket) {
      console.log(`Cliente desconectado: ${client.id}`);
    }
  
    @SubscribeMessage('moveCard')
    handleMoveCard(@MessageBody() data: any) {
      // Lógica para manejar el movimiento de tarjetas
      this.server.emit('cardMoved', data);
    }
  }