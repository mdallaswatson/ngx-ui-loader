import { Component, signal } from '@angular/core';

import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';


import { ControllerComponent } from '../controller/controller.component';
import { NgxUiLoaderModule } from "projects/ngx-ui-loader/src/lib/core/ngx-ui-loader.module";
import { Loader } from "projects/ngx-ui-loader/src/lib/utils/interfaces";


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

  loader = signal<Loader>({
    loaderId: 'customLoaderId',
    tasks: {},
    isMaster: false,
    isBound: false,
  });

  // Configuration for the loader display
  loaderConfig = {
    hasProgressBar: true,
    fgsSize: 100,
    bgsSize: 64,
    gap: 80,
    text: 'Custom Spinner',
  };
}
