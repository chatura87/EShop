import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subject} from "rxjs";
import {FormControl} from "@angular/forms";
import {debounceTime, switchMap, takeUntil} from "rxjs/operators";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-product-container',
  templateUrl: './product-container.component.html',
  styleUrls: ['./product-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductContainerComponent implements OnInit {

  products$: any;
  recordCount: number = 0;
  filter = new FormControl('');
  private productLookup$: Subject<void> = new Subject();
  destroySub = new Subject();

  constructor(private readonly route: ActivatedRoute,
              private readonly productService: ProductService,
              private readonly changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.products$ = this.route.snapshot.data.products;
    this.filter.valueChanges.pipe(takeUntil(this.destroySub)).subscribe(() =>
      this.productLookup$.next(this.filter.value));

    this.productLookup$
      .pipe(
        debounceTime(500),
        switchMap(() => {
          return this.productService.fetchtByName(this.filter.value);
        }))
      .subscribe(results => {
        this.products$ = results;
        this.recordCount = results.length;
        this.changeDetectorRef.detectChanges();
      });
  }

}
