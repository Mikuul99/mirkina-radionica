import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DbData } from '../models/dbData';
import { Product } from '../models/Product';
import { ProductService } from '../service/product.service';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  
  showAddProduct: boolean = false;
  products: Product[] = [];
  updateFormValue;

  constructor(
    public service: ProductService,
    public dialog: MatDialog,
    public router: Router,
    public route: ActivatedRoute,
    private authService: AuthService) { }
  
  ngOnInit(): void {
    this.service.getProducts().subscribe((data: DbData)=> {
      this.products = data.body.map(
        (product: Product) => new Product(product.id, product.price, product.carousel, product.additional, product.dezen, product.komplet, product.category)
      )
      console.log(this.products)
    });
  }

  logout() {
    this.authService.logout();
  }

  showForm() {
    this.showAddProduct = !this.showAddProduct;
  }

  deleteProduct(id: any) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe((result:any) => {
      if(result === 'true') {
        console.log(result);
        this.service.deleteProduct(id);
      }
    })
  }
}
