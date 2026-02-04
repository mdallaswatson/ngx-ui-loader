import { Component, ViewContainerRef } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { DemoService } from './demo.service';
import { NgxUiLoaderModule } from "projects/ngx-ui-loader/src/lib/core/ngx-ui-loader.module";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    NgxUiLoaderModule,
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class AppComponent {
  /**
   * Constructor
   */
  constructor(
    public demoService: DemoService,
    public vcRef: ViewContainerRef,
  ) {}

  openDocumentation() {
    window.open('https://tdev.app/ngx-ui-loader', '_blank');
  }

  openGithub() {
    window.open('https://github.com/t-ho/ngx-ui-loader', '_blank');
  }
}
