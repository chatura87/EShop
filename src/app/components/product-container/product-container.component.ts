import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, NgZone,
  OnInit
} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {of, Subject} from "rxjs";
import {debounceTime, shareReplay, switchMap, takeUntil} from "rxjs/operators";
import {Product} from "../../models/product";
import {ProductService} from "../../services/product/product.service";
import {CommonService} from "../../services/common.service";

@Component({
  selector: 'app-product-container',
  templateUrl: './product-container.component.html',
  styleUrls: ['./product-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductContainerComponent implements OnInit, AfterViewInit {

  products: Product[] = [];
  page = 0;
  size = 30;
  recordCount: number = 0;
  filter = new FormControl('',);

  private productLookup$: Subject<void> = new Subject();
  destroySub = new Subject();

  constructor(private readonly route: ActivatedRoute,
              private readonly productService: ProductService,
              private readonly changeDetectorRef: ChangeDetectorRef,
              private readonly commonService: CommonService,
              private zone: NgZone) {
  }

  ngAfterViewInit(): void {
    this.filter.valueChanges
      .pipe(takeUntil(this.destroySub))
      .subscribe(() => {
        this.productLookup$.next(this.filter.value)
      });
    this.productLookup$
      .pipe(
        debounceTime(200),
        switchMap(() => {
          return this.productService.fetchByName(this.filter.value);
        }))
      .subscribe(results => {
        this.products = results;
        this.commonService.sortByName(this.products);
        this.recordCount = results.length;
        this.changeDetectorRef.detectChanges();
      });
  }

  ngOnInit(): void {
    this.getDataSetByPageAndSize(this.page, this.size);
  }

  /*
 * Fetch a list of product and assign to a template variable
 * @param number page number
 * @param size size of the list
 */
  private getDataSetByPageAndSize(number: number, size: number): void {
    this.productService.fetchAll()
      .pipe(takeUntil(this.destroySub))
      .subscribe(products => {
        this.products = products;
        this.commonService.sortByName(this.products);
        this.changeDetectorRef.detectChanges();
      })
  }

  /*
  *Track by function for product list
  * @param index position.
  * @param product Product model
  */
  identity(index: number, product: Product): number {
    return product.id;
  }
}
