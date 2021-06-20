import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from "./components/nav/nav.component";
import { ProductComponent } from "./components/admin/product/product.component";
import { CartComponent } from "./components/cart/cart.component";
import { ProductContainerComponent } from "./components/product-container/product-container.component";
import { UserResolverService } from "./services/user-resolver.service";
import { AdminGuard } from "./services/admin-guard.service";
import { UnauthorizedComponent } from "./components/unautorized/unauthorized.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: 'home/:id', component: NavComponent, resolve: { user: UserResolverService }, children: [
      { path: 'product-mgt', component: ProductComponent, canActivate: [AdminGuard] },
      { path: 'products', component: ProductContainerComponent, canActivate: [AdminGuard] }
    ]
  },
  { path: 'admin', component: NavComponent },
  { path: 'cart', component: CartComponent },
  { path: 'products', component: ProductContainerComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: '**', redirectTo: 'unauthorized', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
