import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {CommonService} from "./services/common.service";
import {SwUpdate} from "@angular/service-worker";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {User} from "./models/user/user";
import {UserRole} from "./enums/user-role";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {

  destroySub$ = new Subject();
  isMenuOpen = false;
  userRole = UserRole;
  user: User = {
    avatar: "",
    email: "",
    id: 0,
    name: {firstName: '', lastName: ''},
    orders: [],
    phone: "",
    role: UserRole.CUSTOMER
  };

  constructor(private readonly commonService: CommonService, private swUpdate: SwUpdate) {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available
        .pipe(takeUntil(this.destroySub$))
        .subscribe(() => {
          if (confirm("New version available. Load New Version?")) {
            window.location.reload();
          }
        });
    }
  }

  logout() {
//TODO: implement if needed
  }

  toggleSideNav() {
    this.isMenuOpen = !this.isMenuOpen;
    this.commonService.toggleStatusSub.next(this.isMenuOpen);
  }


  ngOnInit(): void {
    this.commonService.user$
      .pipe(takeUntil(this.destroySub$))
      .subscribe(user => {
        this.user = user;
      });
  }

  ngOnDestroy(): void {
    this.destroySub$.next();
    this.destroySub$.complete();
  }

}
