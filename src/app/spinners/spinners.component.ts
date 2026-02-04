import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';
import { SPINNER_CONFIG } from 'projects/ngx-ui-loader/src/lib/utils/constants';
import { MatButton } from "@angular/material/button";


@Component({
  selector: 'app-spinners',
  templateUrl: './spinners.component.html',
  styleUrls: [
    '../../../projects/ngx-ui-loader/src/lib/core/ngx-ui-loader.component.scss',
    './spinners.component.scss',
  ],
  imports: [RouterLink, MatButton],
})
export class SpinnersComponent {
  spinners: Array<{
    name: string;
    divs: number[];
    class: string;
  }> = Object.keys(SPINNER_CONFIG).map((key) => ({
    name: key,
    divs: Array(SPINNER_CONFIG[key].divs).fill(1),
    class: SPINNER_CONFIG[key].class,
  }));
}
