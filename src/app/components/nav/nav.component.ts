import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonService} from "../../services/common.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent implements OnInit {


  constructor(
    private route: ActivatedRoute,
    private  router: Router,
    readonly commonService: CommonService) {
  }

  ngOnInit(): void {
    this.commonService.userSub.next(this.route.snapshot.data.user);
   this.router.navigate([`/home/${this.commonService.userSub.getValue().id}/product-mgt`])
  }

}
