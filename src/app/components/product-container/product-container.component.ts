import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef, HostListener,
  NgZone,
  OnInit
} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable, of, Subject} from "rxjs";
import {FormControl} from "@angular/forms";
import {debounceTime, switchMap, takeUntil} from "rxjs/operators";
import {ProductService} from "../../services/product.service";
import {Sort} from "../../datasources/page";
import {PaginationDataSource} from "../../datasources/PaginationDataSource";
import {Product} from "../../models/product";

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
              private zone: NgZone) {
  }

  ngOnInit(): void {
    this.getFilteredDataSet(this.page, this.size);
    this.filter.valueChanges
      .pipe(takeUntil(this.destroySub))
      .subscribe(() => {
        this.productLookup$.next(this.filter.value)
      });
    this.productLookup$
      .pipe(
        debounceTime(500),
        switchMap(() => {
          return this.productService.fetchtByName(this.filter.value);
        }))
      .subscribe(results => {
        this.products = results;
        this.recordCount = results.length;
        this.changeDetectorRef.detectChanges();
      });
  }

  private getFilteredDataSet(number: number, size: number) {
    this.productService.filterByPage(number, size)
      .pipe(takeUntil(this.destroySub))
      .subscribe(products => {
        this.products.push(...products);
        this.changeDetectorRef.detectChanges();
      })
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      document.addEventListener('scroll', () => {
        let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
        let max = document.documentElement.scrollHeight;
        if (pos > max - 50) {
          this.zone.run(() => {
            this.getFilteredDataSet(++this.page, this.size);
          });
        }
      });
    });
  }
}