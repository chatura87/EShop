import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductContainerComponent } from './product-container.component';
import {ActivatedRoute, Router, RouterModule} from "@angular/router";

describe('ProductContainerComponent', () => {
  let component: ProductContainerComponent;
  let fixture: ComponentFixture<ProductContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductContainerComponent ],
      imports:[RouterModule.forRoot([])]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
