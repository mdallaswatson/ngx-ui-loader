import { Component, inject } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

import { DemoService } from './demo.service';
import { NgxUiLoaderModule } from "projects/ngx-ui-loader/src/lib/core/ngx-ui-loader.module";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    NgxUiLoaderModule,
    RouterOutlet,
    MatToolbar,
    MatIcon,
    MatButton,
  ],
})
export class AppComponent {
  demoService = inject(DemoService);


  openDocumentation() {
    window.open('https://tdev.app/ngx-ui-loader', '_blank');
  }

  openGithub() {
    window.open('https://github.com/t-ho/ngx-ui-loader', '_blank');
  }
}
