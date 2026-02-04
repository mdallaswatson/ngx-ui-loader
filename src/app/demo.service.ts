import { Injectable } from '@angular/core';
import { NgxUiLoaderConfig } from "projects/ngx-ui-loader/src/lib/utils/interfaces";
import { NgxUiLoaderService } from "projects/ngx-ui-loader/src/lib/core/ngx-ui-loader.service";


@Injectable({ providedIn: 'root' })
export class DemoService {
  config: NgxUiLoaderConfig;


  constructor(private ngxUiLoaderService: NgxUiLoaderService) {
    this.config = this.ngxUiLoaderService.getDefaultConfig();
  }
}
