import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ViacepService } from './viacep.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ViacepModule {

  static forRoot(): ModuleWithProviders {

    return {
      ngModule: ViacepModule,
      providers: [ViacepService]
    };
  }
}