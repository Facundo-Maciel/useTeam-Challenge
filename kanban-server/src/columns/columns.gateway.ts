import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  
  @WebSocketGateway({ cors: true })
  export class ColumnsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
  
    handleConnection(client: Socket) {
      console.log(`Cliente conectado: ${client.id}`);
    }
  
    handleDisconnect(client: Socket) {
      console.log(`Cliente desconectado: ${client.id}`);
    }
  
    @SubscribeMessage('createColumn')
    handleCreateColumn(@MessageBody() data: any) {
      // Lógica para manejar la creación de una columna
      // Por ejemplo, emitir el evento a todos los clientes
      this.server.emit('columnCreated', data);
    }
  
    // Puedes agregar más métodos para manejar otros eventos relacionados con columnas
  }
  