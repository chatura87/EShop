import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {ProductComponent} from "./components/product/product.component";
import {CartComponent} from "./components/cart/cart.component";
import {ProductContainerComponent} from "./components/product-container/product-container.component";
import {UserResolverService} from "./services/user-resolver.service";
import {AdminGuard} from "./services/admin-guard.service";
import {UnautorizedComponent} from "./components/unautorized/unautorized.component";
import {WelcomeComponent} from "./components/welcome/welcome.component";
import {ProductResolveService} from "./services/product-resolve.service";

const routes: Routes = [
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {
    path: 'home/:id', component: HomeComponent, resolve: {user: UserResolverService}, children: [
      {path: 'product-list', component: ProductContainerComponent,resolve:{products: ProductResolveService}},
      {path: 'product-mgt', component: ProductComponent, canActivate: [AdminGuard]}
    ]
  },
  {path: 'admin', component: HomeComponent},
  {path: 'cart', component: CartComponent},
  {path: 'products', component: ProductContainerComponent},
  {path: 'unauthorized', component: UnautorizedComponent},
  {path: 'welcome', component: WelcomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
