import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductItemComponent} from './product-item.component';

describe('ProductItemComponent', () => {
  let component: ProductItemComponent;
  let fixture: ComponentFixture<ProductItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductItemComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItemComponent);
    component = fixture.componentInstance;
    component._product = {
      id: 1,
      name: "John",
      description: "test description",
      discount: 30,
      defaultImage: "test image",
      images: ['a', 'b'],
      price: 300
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
