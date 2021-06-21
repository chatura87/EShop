import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductComponent} from './product.component';
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {ProductService} from "../../../services/product/product.service";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {By} from "@angular/platform-browser";
import {ReactiveFormsModule} from "@angular/forms";
import {Overlay} from "@angular/cdk/overlay";

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductComponent],
      imports: [
        MatSnackBarModule,
        MatTableModule,
        MatSortModule,
        ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [ProductService, MatSnackBar, Overlay ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initially sets up sorting', () => {
    fixture.detectChanges();
    const sort = component.dataSource.sort;
    expect(sort).toBeInstanceOf(MatSort);
  });

  it('should call save() method on form submit', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const getForm = fixture.debugElement.query(By.css('#formID'));
    expect(getForm.triggerEventHandler('submit', compiled)).toBeUndefined();
  });
});
