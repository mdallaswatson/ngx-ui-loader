import { Injectable, inject, signal } from '@angular/core';
import { NgxUiLoaderConfig } from "projects/ngx-ui-loader/src/lib/utils/interfaces";
import { NgxUiLoaderService } from "projects/ngx-ui-loader/src/lib/core/ngx-ui-loader.service";


@Injectable({ providedIn: 'root' })
export class DemoService {
  private ngxUiLoaderService = inject(NgxUiLoaderService);

  config = signal<NgxUiLoaderConfig>(this.ngxUiLoaderService.getDefaultConfig());

  updateConfig(updates: Partial<NgxUiLoaderConfig>) {
    this.config.update(current => ({ ...current, ...updates }));
  }
}
