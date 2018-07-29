import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxViacepModule } from '@brunoc/ngx-viacep';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxViacepModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
