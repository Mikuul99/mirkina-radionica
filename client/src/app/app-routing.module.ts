import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './admin-panel/add-product/add-product.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { LoginComponent } from './auth/login/login.component';
import { ContactComponent } from './contact/contact.component';
import { InfoComponent } from './info/info.component';
import { LandingComponent } from './landing/landing.component';
import { ProductsComponent } from './products/products.component';
import { SingleProductComponent } from './products/single-product/single-product.component';
import { AuthGuard } from './service/auth.guard';
import { SupportComponent } from './support/support.component';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "store", component: ProductsComponent},
  {path: "", component: LandingComponent},
  {path: "store/product/:id", component: SingleProductComponent},
  {path: "admin", canActivate:[AuthGuard], component: AdminPanelComponent},
  {path: "admin/product/:id", canActivate: [AuthGuard], component: SingleProductComponent},
  {path: "admin/add-product", canActivate:[AuthGuard], component: AddProductComponent},
  {path: "contact", component: ContactComponent},
  {path: "support", component: SupportComponent},
  {path: "info", component: InfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
