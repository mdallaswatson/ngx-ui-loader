import { Injectable, inject } from '@angular/core';
import { NgxUiLoaderConfig } from "projects/ngx-ui-loader/src/lib/utils/interfaces";
import { NgxUiLoaderService } from "projects/ngx-ui-loader/src/lib/core/ngx-ui-loader.service";


@Injectable({ providedIn: 'root' })
export class DemoService {
  private ngxUiLoaderService = inject(NgxUiLoaderService);

  config: NgxUiLoaderConfig;


  constructor() {
    this.config = this.ngxUiLoaderService.getDefaultConfig();
  }
}
