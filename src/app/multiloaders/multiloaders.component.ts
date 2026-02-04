import { Component, inject } from '@angular/core';

import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';


import { ControllerComponent } from '../controller/controller.component';
import { Loader, NgxUiLoaderModule, NgxUiLoaderService, SPINNER } from "projects/ngx-ui-loader/src/public-api";

const LOGO_URL = 'assets/angular.png';

@Component({
  selector: 'app-multiloaders',
  templateUrl: './multiloaders.component.html',
  styleUrls: ['./multiloaders.component.scss'],
  imports: [
    RouterLink,
    NgxUiLoaderModule,
    ControllerComponent,
    MatButton,
  ],
})
export class MultiloadersComponent {
  private ngxUiLoaderService = inject(NgxUiLoaderService);

  loaders: Array<{
    hasProgressBar: boolean;
    loaderId: string;
    logoUrl?: string;
    logoSize?: number;
    isMaster: boolean;
    spinnerType: SPINNER;
    text?: string;
  }>;
  masterLoader: Loader;

  constructor() {
    this.masterLoader = this.ngxUiLoaderService.getLoader();
    this.loaders = [
      {
        hasProgressBar: true,
        loaderId: 'loader-01',
        logoUrl: LOGO_URL,
        logoSize: 80,
        isMaster: false,
        spinnerType: SPINNER.ballScaleMultiple,
      },
      {
        hasProgressBar: false,
        loaderId: 'loader-02',
        isMaster: false,
        spinnerType: SPINNER.chasingDots,
        text: 'NO progress bar',
      },
      {
        hasProgressBar: true,
        loaderId: 'loader-03',
        isMaster: false,
        spinnerType: SPINNER.wanderingCubes,
      },
    ];
  }
}
