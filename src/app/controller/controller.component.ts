import { Component, OnInit, OnDestroy, inject, input, signal, ChangeDetectionStrategy } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggle, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatList, MatListItem, MatListModule } from '@angular/material/list';
import { Loader } from "projects/ngx-ui-loader/src/lib/utils/interfaces";
import { NgxUiLoaderService } from "projects/ngx-ui-loader/src/lib/core/ngx-ui-loader.service";



@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.scss'],
  imports: [FormsModule, MatList, MatListItem, MatSlideToggle],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControllerComponent implements OnInit, OnDestroy {
  private ngxUiLoaderService = inject(NgxUiLoaderService);

  loader = input.required<Loader>();

  timers: ReturnType<typeof setTimeout>[];
  tasks = signal<{ [key: string]: boolean }>({});


  ngOnInit() {
    this.timers = [];
    const initialTasks: { [key: string]: boolean } = {};
    if (this.loader().isMaster) {
      // Convert Tasks to boolean dictionary for UI state tracking
      Object.keys(this.loader().tasks).forEach((taskId) => {
        initialTasks[taskId] = !!this.loader().tasks[taskId];
      });
    }
    this.tasks.set(initialTasks);
  }

  fgSlideChange(
    checked: boolean,
    delay: number,
    taskId: string = 'fg-default',
  ) {
    if (checked) {
      this.ngxUiLoaderService.startLoader(this.loader().loaderId, taskId);
      this.tasks.update(tasks => ({ ...tasks, [taskId]: true }));
      this.timers = [
        ...this.timers,
        setTimeout(() => {
          this.ngxUiLoaderService.stopLoader(this.loader().loaderId, taskId);
          this.tasks.update(tasks => ({ ...tasks, [taskId]: false }));
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
      this.tasks.update(tasks => ({ ...tasks, [taskId]: true }));
    } else {
      this.ngxUiLoaderService.stopBackgroundLoader(
        this.loader().loaderId,
        taskId,
      );
      this.tasks.update(tasks => ({ ...tasks, [taskId]: false }));
    }
  }

  ngOnDestroy() {
    this.timers.forEach((timer) => clearTimeout(timer));
  }
}
