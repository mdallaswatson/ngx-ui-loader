import { Component, inject, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import { ColorPickerDirective } from 'ngx-color-picker';


import { DemoService } from '../demo.service';
import { ControllerComponent } from '../controller/controller.component';
import { Loader } from "projects/ngx-ui-loader/src/lib/utils/interfaces";
import { NgxUiLoaderService } from "projects/ngx-ui-loader/src/lib/core/ngx-ui-loader.service";
import { PB_DIRECTION, POSITION, SPINNER } from "projects/ngx-ui-loader/src/public-api";

const LOGO_URL = 'assets/angular.png';

@Component({
  selector: 'app-master-configuration',
  templateUrl: './master-configuration.component.html',
  styleUrls: ['./master-configuration.component.scss'],
  imports: [
    FormsModule,
    RouterLink,
    ColorPickerDirective,
    ControllerComponent,
    JsonPipe,
    MatFormField,
    MatLabel,
    MatInput,
    MatIconButton,
    MatIcon,
    MatSelect,
    MatOption,
    MatSlider,
    MatSliderThumb,
    MatCheckbox,
    MatButton
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MasterConfigurationComponent implements OnInit {
  private ngxUiLoaderService = inject(NgxUiLoaderService);
  demoService = inject(DemoService);
  private http = inject(HttpClient);

  spinnerTypes = signal<string[]>([]);
  positions = signal<string[]>([]);
  directions = signal<string[]>([]);

  disabled = signal<boolean>(false);

  loader = signal<Loader>({
    loaderId: '',
    tasks: {},
    isMaster: true,
    isBound: false,
  });

  /**
   * On init
   */
  ngOnInit() {
    this.spinnerTypes.set(Object.keys(SPINNER).map((key) => SPINNER[key]));
    this.positions.set(Object.keys(POSITION).map((key) => POSITION[key]));
    this.directions.set(Object.keys(PB_DIRECTION).map((key) => PB_DIRECTION[key]));

    this.disabled.set(false);

    this.loader.set(this.ngxUiLoaderService.getLoader());
  }

  /**
   * Add logo url
   */
  addLogo(checked: boolean) {
    if (checked) {
      this.demoService.updateConfig({ logoUrl: LOGO_URL });
    } else {
      this.demoService.updateConfig({ logoUrl: '' });
    }
  }

  /**
   * Toggle progress bar
   */
  toggleProgressBar(checked: boolean) {
    this.demoService.updateConfig({ hasProgressBar: checked });
  }

  /**
   * Reset the form
   */
  reset() {
    this.demoService.config.set(this.ngxUiLoaderService.getDefaultConfig());
  }

  getDownloadStats() {
    this.disabled.set(true);
    this.http
      .get(
        `https://api.npmjs.org/downloads/range/last-month/ngx-ui-loader?t=${Date.now()}`,
      )
      .subscribe(
        (res: { downloads: Array<{ day: string; downloads: number }> }) => {
          console.log(res);
          this.disabled.set(false);
        },
      );
  }

  openGithub() {
    window.open('https://github.com/t-ho/ngx-ui-loader', '_blank');
  }
}
