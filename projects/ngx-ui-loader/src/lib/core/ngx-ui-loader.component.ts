/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, OnInit, OnChanges, SimpleChanges, SimpleChange, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, TemplateRef, inject, input } from '@angular/core';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeStyle,
} from '@angular/platform-browser';
import { NgxUiLoaderService } from './ngx-ui-loader.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { NgxUiLoaderConfig } from '../utils/interfaces';
import { DirectionType, PositionType, SpinnerType } from '../utils/types';
import { POSITION } from '../utils/enums';
import { SPINNER_CONFIG } from '../utils/constants';
import { ShowEvent } from '../utils/interfaces';

@Component({
  selector: 'ngx-ui-loader',
  templateUrl: './ngx-ui-loader.component.html',
  styleUrls: ['./ngx-ui-loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class NgxUiLoaderComponent implements OnChanges, OnDestroy, OnInit {
  private domSanitizer = inject(DomSanitizer);
  private changeDetectorRef = inject(ChangeDetectorRef);
  private ngxService = inject(NgxUiLoaderService);

  defaultConfig: NgxUiLoaderConfig = this.ngxService.getDefaultConfig();


  readonly bgsColor = input<string>(this.defaultConfig.bgsColor);
  readonly bgsOpacity = input<number>(this.defaultConfig.bgsOpacity);
  readonly bgsPosition = input<PositionType>(this.defaultConfig.bgsPosition);
  readonly bgsSize = input<number>(this.defaultConfig.bgsSize);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly bgsTemplate = input<TemplateRef<any>>(undefined);
  readonly bgsType = input<SpinnerType>(this.defaultConfig.bgsType);
  readonly fgsColor = input<string>(this.defaultConfig.fgsColor);
  readonly fgsPosition = input<PositionType>(this.defaultConfig.fgsPosition);
  readonly fgsSize = input<number>(this.defaultConfig.fgsSize);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly fgsTemplate = input<TemplateRef<any>>(undefined);
  readonly fgsType = input<SpinnerType>(this.defaultConfig.fgsType);
  readonly gap = input<number>(this.defaultConfig.gap);
  readonly loaderId = input<string>(this.defaultConfig.masterLoaderId);
  readonly logoPosition = input<PositionType>(this.defaultConfig.logoPosition);
  readonly logoSize = input<number>(this.defaultConfig.logoSize);
  readonly logoUrl = input<string>(this.defaultConfig.logoUrl);
  readonly overlayBorderRadius = input<string>(this.defaultConfig.overlayBorderRadius);
  readonly overlayColor = input<string>(this.defaultConfig.overlayColor);
  readonly pbColor = input<string>(this.defaultConfig.pbColor);
  readonly pbDirection = input<DirectionType>(this.defaultConfig.pbDirection);
  readonly pbThickness = input<number>(this.defaultConfig.pbThickness);
  readonly hasProgressBar = input<boolean>(this.defaultConfig.hasProgressBar);
  readonly text = input<string>(this.defaultConfig.text);
  readonly textColor = input<string>(this.defaultConfig.textColor);
  readonly textPosition = input<PositionType>(this.defaultConfig.textPosition);

  fastFadeOut: boolean = this.defaultConfig.fastFadeOut;
  fgDivs: number[];
  fgSpinnerClass: string;
  bgDivs: number[];
  bgSpinnerClass: string;
  showForeground: boolean;
  showBackground: boolean;
  foregroundClosing: boolean;
  backgroundClosing: boolean;

  trustedLogoUrl: SafeResourceUrl;
  logoTop: SafeStyle;
  spinnerTop: SafeStyle;
  textTop: SafeStyle;

  showForegroundWatcher: Subscription;
  showBackgroundWatcher: Subscription;
  foregroundClosingWatcher: Subscription;
  backgroundClosingWatcher: Subscription;


  initialized: boolean = false;




  ngOnInit() {
    this.initializeSpinners();
    this.ngxService.bindLoaderData(this.loaderId());
    this.determinePositions();

    this.trustedLogoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(
      this.logoUrl(),
    );

    this.showForegroundWatcher = this.ngxService.showForeground$
      .pipe(
        filter((showEvent: ShowEvent) => this.loaderId() === showEvent.loaderId),
      )
      .subscribe((data) => {
        this.showForeground = data.isShow;
        this.changeDetectorRef.markForCheck();
      });

    this.showBackgroundWatcher = this.ngxService.showBackground$
      .pipe(
        filter((showEvent: ShowEvent) => this.loaderId() === showEvent.loaderId),
      )
      .subscribe((data) => {
        this.showBackground = data.isShow;
        this.changeDetectorRef.markForCheck();
      });

    this.foregroundClosingWatcher = this.ngxService.foregroundClosing$
      .pipe(
        filter((showEvent: ShowEvent) => this.loaderId() === showEvent.loaderId),
      )
      .subscribe((data) => {
        this.foregroundClosing = data.isShow;
        this.changeDetectorRef.markForCheck();
      });

    this.backgroundClosingWatcher = this.ngxService.backgroundClosing$
      .pipe(
        filter((showEvent: ShowEvent) => this.loaderId() === showEvent.loaderId),
      )
      .subscribe((data) => {
        this.backgroundClosing = data.isShow;
        this.changeDetectorRef.markForCheck();
      });
    this.initialized = true;
  }

  /**
   * On changes event
   */
  ngOnChanges(changes: SimpleChanges) {
    if (!this.initialized) {
      return;
    }

    const bgsTypeChange: SimpleChange = changes['bgsType'];
    const fgsTypeChange: SimpleChange = changes['fgsType'];
    const logoUrlChange: SimpleChange = changes['logoUrl'];

    if (fgsTypeChange || bgsTypeChange) {
      this.initializeSpinners();
    }

    this.determinePositions();

    if (logoUrlChange) {
      this.trustedLogoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(
        this.logoUrl(),
      );
    }
  }

  /**
   * On destroy event
   */
  ngOnDestroy() {
    this.ngxService.destroyLoaderData(this.loaderId());
    if (this.showForegroundWatcher) {
      this.showForegroundWatcher.unsubscribe();
    }
    if (this.showBackgroundWatcher) {
      this.showBackgroundWatcher.unsubscribe();
    }
    if (this.foregroundClosingWatcher) {
      this.foregroundClosingWatcher.unsubscribe();
    }
    if (this.backgroundClosingWatcher) {
      this.backgroundClosingWatcher.unsubscribe();
    }
  }

  /**
   * Initialize spinners
   */
  private initializeSpinners(): void {
    this.fgDivs = Array(SPINNER_CONFIG[this.fgsType()].divs).fill(1);
    this.fgSpinnerClass = SPINNER_CONFIG[this.fgsType()].class;
    this.bgDivs = Array(SPINNER_CONFIG[this.bgsType()].divs).fill(1);
    this.bgSpinnerClass = SPINNER_CONFIG[this.bgsType()].class;
  }

  /**
   * Determine the positions of spinner, logo and text
   */
  private determinePositions(): void {
    this.logoTop = 'initial';
    this.spinnerTop = 'initial';
    this.textTop = 'initial';
    const textSize = 24;

    const logoPosition = this.logoPosition();
    if (logoPosition.startsWith('center')) {
      this.logoTop = '50%';
    } else if (logoPosition.startsWith('top')) {
      this.logoTop = '30px';
    }

    const fgsPosition = this.fgsPosition();
    if (fgsPosition.startsWith('center')) {
      this.spinnerTop = '50%';
    } else if (fgsPosition.startsWith('top')) {
      this.spinnerTop = '30px';
    }

    const textPosition = this.textPosition();
    if (textPosition.startsWith('center')) {
      this.textTop = '50%';
    } else if (textPosition.startsWith('top')) {
      this.textTop = '30px';
    }

    if (fgsPosition === POSITION.centerCenter) {
      if (this.logoUrl() && logoPosition === POSITION.centerCenter) {
        if (this.text() && textPosition === POSITION.centerCenter) {
          // logo, spinner and text
          this.logoTop = this.domSanitizer.bypassSecurityTrustStyle(
            `calc(50% - ${this.fgsSize() / 2}px - ${textSize / 2}px - ${
              this.gap()
            }px)`,
          );
          this.spinnerTop = this.domSanitizer.bypassSecurityTrustStyle(
            `calc(50% + ${this.logoSize() / 2}px - ${textSize / 2}px)`,
          );
          this.textTop = this.domSanitizer.bypassSecurityTrustStyle(
            `calc(50% + ${this.logoSize() / 2}px + ${this.gap()}px + ${
              this.fgsSize() / 2
            }px)`,
          );
        } else {
          // logo and spinner
          this.logoTop = this.domSanitizer.bypassSecurityTrustStyle(
            `calc(50% - ${this.fgsSize() / 2}px - ${this.gap() / 2}px)`,
          );
          this.spinnerTop = this.domSanitizer.bypassSecurityTrustStyle(
            `calc(50% + ${this.logoSize() / 2}px + ${this.gap() / 2}px)`,
          );
        }
      } else {
        if (this.text() && textPosition === POSITION.centerCenter) {
          // spinner and text
          this.spinnerTop = this.domSanitizer.bypassSecurityTrustStyle(
            `calc(50% - ${textSize / 2}px - ${this.gap() / 2}px)`,
          );
          this.textTop = this.domSanitizer.bypassSecurityTrustStyle(
            `calc(50% + ${this.fgsSize() / 2}px + ${this.gap() / 2}px)`,
          );
        }
      }
    } else {
      if (
        this.logoUrl() &&
        logoPosition === POSITION.centerCenter &&
        this.text() &&
        textPosition === POSITION.centerCenter
      ) {
        // logo and text
        this.logoTop = this.domSanitizer.bypassSecurityTrustStyle(
          `calc(50% - ${textSize / 2}px - ${this.gap() / 2}px)`,
        );
        this.textTop = this.domSanitizer.bypassSecurityTrustStyle(
          `calc(50% + ${this.logoSize() / 2}px + ${this.gap() / 2}px)`,
        );
      }
    }
  }
}
