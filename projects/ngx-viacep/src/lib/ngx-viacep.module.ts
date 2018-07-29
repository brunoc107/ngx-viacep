import { NgModule } from '@angular/core';
import { NgxViacepService } from './ngx-viacep.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule
  ],
  declarations: [],
  exports: [],
  providers: [
    NgxViacepService
  ]
})
export class NgxViacepModule { }
