import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {ProductComponent} from './components/product/product.component';
import {CartComponent} from './components/cart/cart.component';
import {ProductItemComponent} from './components/product-item/product-item.component';
import {ProductContainerComponent} from './components/product-container/product-container.component';
import {NavComponent} from './components/nav/nav.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {eShopInterceptor} from "./services/e-shop-interceptor.service";
import {AngularMaterialModule} from "./angular-material.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UsernamePipe} from "./pipes/username.pipe";
import {ReactiveFormsModule} from "@angular/forms";
import {UnauthorizedComponent} from './components/unautorized/unauthorized.component';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {NgxSpinnerModule} from "ngx-spinner";
import {ScrollDirective} from "./directive/scroll.directive";
import {LimitChars} from "./pipes/limt-chars";
import {NumberOnlyDirective} from "./directive/number-only.directive";

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    CartComponent,
    ProductItemComponent,
    ProductContainerComponent,
    NavComponent,
    UsernamePipe,
    UnauthorizedComponent,
    WelcomeComponent,
    ScrollDirective,
    LimitChars,
    NumberOnlyDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: eShopInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
