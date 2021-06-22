import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, NgZone,
  OnInit
} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Subject} from "rxjs";
import {debounceTime, switchMap, takeUntil} from "rxjs/operators";
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
  filter = new FormControl('');

  private productLookup$: Subject<void> = new Subject();
  destroySub = new Subject();

  constructor(private readonly route: ActivatedRoute,
              private readonly productService: ProductService,
              private readonly changeDetectorRef: ChangeDetectorRef,
              private readonly commonService: CommonService,
              private zone: NgZone) {
  }

  ngOnInit(): void {
    this.getDataSetByPageAndSize(this.page, this.size);
    this.filter.valueChanges
      .pipe(takeUntil(this.destroySub))
      .subscribe(() => {
        this.productLookup$.next(this.filter.value)
      });
    this.productLookup$
      .pipe(
        debounceTime(200),
        switchMap(() => {
          if (this.filter.value.toString() === '') {
            return this.productService.filterByPage(1, 30);
            this.recordCount = 0;
          }
          return this.productService.fetchtByName(this.filter.value);
        }))
      .subscribe(results => {
        this.products = results;
        this.commonService.sortByName(this.products);
        this.recordCount = results.length;
        this.changeDetectorRef.detectChanges();
      });
  }

  /*
 * Fetch a list of product and assign to a template variable
 * @param number page number
 * @param size size of the list
 */
  private getDataSetByPageAndSize(number: number, size: number):void {
    this.productService.filterByPage(number, size)
      .pipe(takeUntil(this.destroySub))
      .subscribe(products => {
        this.products.push(...products);
        this.commonService.sortByName(this.products);
        this.products.sort((a, b) => {
          return a.name.localeCompare(b.name)
        });
        this.changeDetectorRef.detectChanges();
      })
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      document.addEventListener('scroll', () => {
        let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
        let max = document.documentElement.scrollHeight;
        if (pos > max - 30) {
          this.zone.run(() => {
            this.getDataSetByPageAndSize(++this.page, this.size);
          });
        }
      });
    });
  }
}
