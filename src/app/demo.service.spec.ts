import { TestBed, inject } from '@angular/core/testing';

import { DemoService } from './demo.service';
import { NgxUiLoaderService } from "projects/ngx-ui-loader/src/public-api";

describe('NgxUiLoaderDemoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxUiLoaderService, DemoService],
    });
  });
  it('should be created', inject([DemoService], (service: DemoService) => {
    expect(service).toBeTruthy();
  }));
});
