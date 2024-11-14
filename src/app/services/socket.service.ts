import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { GatewayEventEnum } from '../enums/gateway-event.enum';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  constructor(private socket: Socket) {}

  sendMessage(message: string): void {
    this.socket.emit(GatewayEventEnum.MESSAGE, message);
  }

  getMessages() {
    return this.socket.fromEvent<{ response: string; data: string }>(
      GatewayEventEnum.MESSAGE
    );
  }
}
