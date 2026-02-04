import { Component, inject } from '@angular/core';

import { RouterLink } from '@angular/router';
import { MatButton, MatButtonModule } from '@angular/material/button';


import { ControllerComponent } from '../controller/controller.component';
import { NgxUiLoaderModule } from "projects/ngx-ui-loader/src/lib/core/ngx-ui-loader.module";
import { NgxUiLoaderService } from "projects/ngx-ui-loader/src/lib/core/ngx-ui-loader.service";

@Component({
  selector: 'app-custom-template',
  templateUrl: './custom-template.component.html',
  styleUrls: ['./custom-template.component.scss'],
  imports: [
    RouterLink,
    NgxUiLoaderModule,
    ControllerComponent,
    MatButton,
  ],
})
export class CustomTemplateComponent {
  ngxUiLoader = inject(NgxUiLoaderService);

  loader: {
    hasProgressBar: boolean;
    loaderId: string;
    isMaster: boolean;
    fgsSize: number;
    bgsSize: number;
    gap: number;
    text: string;
  };


  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor() {
    this.loader = {
      hasProgressBar: true,
      loaderId: 'customLoaderId',
      isMaster: false,
      fgsSize: 100,
      bgsSize: 64,
      gap: 80,
      text: 'Custom Spinner',
    };
  }
}
