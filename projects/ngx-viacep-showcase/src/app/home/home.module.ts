import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import {MarkdownModule} from "ngx-markdown";

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MarkdownModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
