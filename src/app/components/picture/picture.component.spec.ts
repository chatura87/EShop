import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureComponent } from './picture.component';
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";

fdescribe('PictureComponent', () => {
  let component: PictureComponent;
  let fixture: ComponentFixture<PictureComponent>;
  let imgEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PictureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureComponent);
    imgEl = fixture.debugElement.query(By.css('img'));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('image should be visible', () => {
    component.url = 'http://placeimg.com/640/480/cats';
    fixture.detectChanges();
    expect(imgEl.nativeElement.src).toBe('http://placeimg.com/640/480/cats');
  });
});
