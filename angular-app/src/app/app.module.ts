import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ZoomvideoComponent } from './zoomvideo/zoomvideo.component';
// const config: SocketIoConfig = { url: 'http://localhost:9898', options: {} };
const config: SocketIoConfig = {url: 'http://localhost:9898', options: {transports: ['websocket']}};


@NgModule({
  declarations: [
    AppComponent,
    ZoomvideoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
