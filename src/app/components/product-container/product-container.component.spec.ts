import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductContainerComponent} from './product-container.component';
import {ActivatedRoute, RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";

describe('ProductContainerComponent', () => {
  let component: ProductContainerComponent;
  let fixture: ComponentFixture<ProductContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductContainerComponent],
      imports: [RouterModule.forRoot([]), ReactiveFormsModule],
      providers:[ActivatedRoute]
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
