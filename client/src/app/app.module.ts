import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { LandingComponent } from './landing/landing.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialDesignModule } from './material-design/material-design.module';
import { LoginComponent } from './auth/login/login.component';
import { SingleProductComponent } from './products/single-product/single-product.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { DeleteDialogComponent } from './admin-panel/delete-dialog/delete-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptorService } from './service/auth-interceptor.service';
import { ProductService } from './service/product.service';
import { ImageSliderModule } from './image-slider/image-slider.module';
import { ContactComponent } from './contact/contact.component';
import { InfoComponent } from './info/info.component';
import { SupportComponent } from './support/support.component';
import { AuthService } from './service/auth.service';
import { UpdateDialogComponent } from './admin-panel/update-dialog/update-dialog.component';
import { AddDialogComponent } from './admin-panel/add-product/add-dialog.component';




@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    LandingComponent,
    LoginComponent,
    SingleProductComponent,
    AdminPanelComponent,
    DeleteDialogComponent,
    AddDialogComponent,
    ContactComponent,
    InfoComponent,
    SupportComponent,
    UpdateDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialDesignModule,
    FormsModule,
    ReactiveFormsModule,
    ImageSliderModule
  ],
  providers: [
    ProductService,
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
