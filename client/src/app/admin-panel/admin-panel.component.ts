import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DbData } from '../models/dbData';
import { Product } from '../models/Product';
import { ProductService } from '../service/product.service';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';
import { AuthService } from '../service/auth.service';
import { AddDialogComponent } from './add-product/add-dialog.component';

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
        (product: Product) => new Product(product.id, product.price, product.carousel, product.additional, product.dezen, product.gnezdo,product.komplet, product.category)
      )
      console.log(this.products)
    });
  }

  logout() {
    this.authService.logout();
  }

  onAddDialog() {
    const dialogRef = this.dialog.open(AddDialogComponent);
    dialogRef.afterClosed().subscribe((newProduct: Product) => {
      if(newProduct && newProduct.carousel.length > 0) {
        this.service.createProduct(newProduct).subscribe((data: Product) => {
          this.products.push(newProduct);
        })
      }
    })
  }

  onDeleteDialog(id: any) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe((result:any) => {
      if(result === 'true') {
        console.log(result);
        this.service.deleteProduct(id);
      }
    })
  }

  onUpdateDialog(product: Product) {
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      data: product
    });

    dialogRef.afterClosed().subscribe((updatedProduct: Product) => {
      if (updatedProduct) {
        console.log(updatedProduct);
        
        this.service.updateProduct(updatedProduct).subscribe(
          (data: Product) => {
            console.log('Product updated:', data);
            // You can optionally update the local product list if needed
            const index = this.products.findIndex(p => p.id === data.id);
            if (index !== -1) {
              this.products[index] = data;
            }
          },
          (error) => {
            console.error('Error updating product:', error);
          }
        );
      }
    });
  }
}
