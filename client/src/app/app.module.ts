import { MaterialModule } from './app-material.module';
import { ChatService } from './services/chat.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ChatComponent } from './components/chat/chat.component';
import { ConfigModalComponent } from './components/config-modal/config-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ChatComponent,
    ConfigModalComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    HttpModule,
  ],
  entryComponents: [
    ConfigModalComponent
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
