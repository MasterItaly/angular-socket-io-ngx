import { HostListener, Injectable, OnDestroy } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { GatewayEventEnum } from '../enums/gateway-event.enum';

@Injectable({
  providedIn: 'root',
})
export class SocketService implements OnDestroy {
  constructor(private socket: Socket) {
    this.socket.on('connect', (): void => {
      console.log('🟢 Successfully connected to the server!');
    });

    this.socket.on('disconnect', (reason: any): void => {
      console.log('🔴 Disconnected:', reason);
    });

    this.socket.on('reconnect', (attempt: any): void => {
      console.log(`🟢 Reconnected on attempt ${attempt}`);
    });

    this.socket.on('reconnect_attempt', (attempt: any): void => {
      console.log(`⚪️ Attempting to reconnect... (Attempt ${attempt})`);
    });

    this.socket.on('reconnect_error', (error: any): void => {
      console.error('🔴 Reconnect error:', error);
    });

    this.socket.on('message', (msg: any): void => {
      console.log('⚪️ Received message:', msg);
    });

    this.socket.on('connect_error', (error: any): void => {
      console.error('🔴 Error connecting to the server:', error);
    });

    this.socket.ioSocket.on('ping', (): void => {
      console.log('⚪️ Ping sent to server');
    });

    this.socket.ioSocket.on('pong', (latency: any): void => {
      console.log(`⚪️ Pong received. Latency: ${latency} ms`);
    });

    this.socket.ioSocket.on('error', (error: any): void => {
      console.error('🔴 Socket.IO Error:', error);
    });

    this.socket.ioSocket.on('upgrade', (): void => {
      console.log('🔵 Connection upgraded to WebSocket');
    });

    this.socket.ioSocket.on('packet', (packet: any): void => {
      console.log('⚪️ Received packet:', packet);
    });
  }

  sendMessage(message: string): void {
    this.socket.emit(GatewayEventEnum.MESSAGE, message);
  }

  getMessages(): Observable<{ response: string; data: string }> {
    return this.socket.fromEvent<{ response: string; data: string }>(
      GatewayEventEnum.MESSAGE
    );
  }

  @HostListener('window:beforeunload')
  ngOnDestroy(): void {
    this.socket?.disconnect();
    console.log('⚪️ Socket connection closed');
  }
}
