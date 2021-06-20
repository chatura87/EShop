import {Directive, NgZone, OnDestroy, OnInit} from "@angular/core";

@Directive({selector: 'reloadDataOnScroll'})
export class ScrollDirective implements OnInit, OnDestroy {
  constructor(private zone: NgZone) {
  }

  ngOnInit() {
    window.addEventListener('scroll', this.scroll, true); //third parameter
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }

  scroll = (event: any): void => {
    this.zone.runOutsideAngular(() => {
      let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
      let max = document.documentElement.scrollHeight;
      // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
      if (pos > max - 50) {
        this.zone.run(() => {
          // this.getFilteredDataSet(++this.page, this.size);
          console.log('fdfso')
        });
      }
    });

  }
}
