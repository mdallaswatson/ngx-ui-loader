import { Component, OnInit, OnDestroy, inject, input } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { Loader } from "projects/ngx-ui-loader/src/lib/utils/interfaces";
import { NgxUiLoaderService } from "projects/ngx-ui-loader/src/lib/core/ngx-ui-loader.service";



@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.scss'],
  imports: [FormsModule, MatButtonModule, MatSlideToggleModule, MatListModule],
})
export class ControllerComponent implements OnInit, OnDestroy {
  private ngxUiLoaderService = inject(NgxUiLoaderService);

 loader = input.required<Loader>();

  timers: ReturnType<typeof setTimeout>[];
  tasks: { [key: string]: boolean };


  ngOnInit() {
    this.timers = [];
    this.tasks = {};
    if (this.loader().isMaster) {
      // Convert Tasks to boolean dictionary for UI state tracking
      Object.keys(this.loader().tasks).forEach((taskId) => {
        this.tasks[taskId] = !!this.loader().tasks[taskId];
      });
    }
  }

  fgSlideChange(
    checked: boolean,
    delay: number,
    taskId: string = 'fg-default',
  ) {
    if (checked) {
      this.ngxUiLoaderService.startLoader(this.loader().loaderId, taskId);
      this.tasks[taskId] = true;
      this.timers = [
        ...this.timers,
        setTimeout(() => {
          this.ngxUiLoaderService.stopLoader(this.loader().loaderId, taskId);
          this.tasks[taskId] = false;
        }, delay),
      ];
    }
  }

  bgSlideChange(checked: boolean, taskId: string = 'bg-default') {
    if (checked) {
      this.ngxUiLoaderService.startBackgroundLoader(
        this.loader().loaderId,
        taskId,
      );
      this.tasks[taskId] = true;
    } else {
      this.ngxUiLoaderService.stopBackgroundLoader(
        this.loader().loaderId,
        taskId,
      );
      this.tasks[taskId] = false;
    }
  }

  ngOnDestroy() {
    this.timers.forEach((timer) => clearTimeout(timer));
  }
}
