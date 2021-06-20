import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatSnackBar} from "@angular/material/snack-bar";

import {of, Subject} from 'rxjs';
import {catchError, map, takeUntil} from "rxjs/operators";

import {Product} from 'src/app/models/product';
import {ProductService} from "../../services/product.service";
import {Action} from "../../enums/action";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit, OnDestroy {

  dataSource!: MatTableDataSource<Product>;
  displayColumns = ['name', 'description', 'price', 'discount', 'defaultImg', 'otherImg'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  destroySub = new Subject<void>();

  productForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', Validators.required),
    discount: new FormControl(0, [Validators.required]),
    defaultImage: new FormControl('', Validators.required),
    images: new FormControl('')
  });

  constructor(
    private readonly productService: ProductService,
    private readonly snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.productService.fetchtAll()
      .pipe(takeUntil(this.destroySub))
      .subscribe(products => {
        this.dataSource = new MatTableDataSource<Product>(products);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort
        })
      })
  }

  private setDataSource(products: Product[]) {
    this.dataSource = new MatTableDataSource<Product>(products);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSubmit() {
    if (this.productForm.value.id > 0) {
      this.productService.update(this.productForm.value)
        .pipe(takeUntil(this.destroySub),
          map((data) => this.onSuccess(data, Action.UPDATE)),
          catchError(error => of(this.handleError(error)))).subscribe();
    } else {
      this.productService.save(this.productForm.value)
        .pipe(takeUntil(this.destroySub),
          map((data) => this.onSuccess(data, Action.SAVE)),
          catchError(error => of(this.handleError(error)))).subscribe();
    }
  }

  resetModule() {
    this.productForm.reset();
  }

  populateFields(row: Product): void {
    this.productForm.patchValue(row);
  }

//TODO: take this to a service
  private onSuccess(data: Product, action: string) {
    this.snackBar.open(`Product ${action} successfully`);
    this.productForm.reset();
    switch (action) {
      case Action.DELETE: {
        const index = this.dataSource.data.map(product => product.id).indexOf(data.id);
        this.dataSource.data.splice(index, 1);
        this.setDataSource(this.dataSource.data);
        return;
      }
      case Action.UPDATE: {
        const index = this.dataSource.data.map(product => product.id).indexOf(data.id);
        this.dataSource.data[index] = data;
        this.setDataSource(this.dataSource.data);
        return;
      }
      case Action.SAVE: {
        this.setDataSource([...this.dataSource.data, data]);
        return;
      }
    }
  }

  private handleError(error: any) {
    this.snackBar.open("Product save failed");
  }

  deleteProduct() {
    this.productService.delete(this.productForm.value.id)
      .pipe(
        takeUntil(this.destroySub),
        map((product: Product) => this.onSuccess(this.productForm.value, Action.DELETE)),
        catchError(error => of(this.handleError(error)))).subscribe();
  }

  ngOnDestroy(): void {
    this.destroySub.next();
    this.destroySub.complete();
  }
}
