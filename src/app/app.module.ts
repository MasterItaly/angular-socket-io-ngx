import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { AppComponent } from './app.component';

const config: SocketIoConfig = {
  url: '/',
  options: {
    transports: ['polling', 'websocket'],
  },
};

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, SocketIoModule.forRoot(config)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
