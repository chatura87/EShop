import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {CommonService} from "./services/common.service";
import {SwUpdate} from "@angular/service-worker";
import {ActivatedRoute} from "@angular/router";
import {SwUpdateServerMock} from "./services/ServiceWorkerMock";

describe('AppComponent', () => {
  beforeEach(async () => {
    // spyOn(, 'isEnabled').and.returnValue(false);
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [CommonService, ActivatedRoute,{ provide: SwUpdate, useClass: SwUpdateServerMock }]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    spyOn(app, 'toggleSideNav');

    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    tick();
    expect(app.toggleSideNav).toHaveBeenCalled();

  }));
});
