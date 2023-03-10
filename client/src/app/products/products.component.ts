import { Component, Input, OnInit } from '@angular/core';
import { DbData } from '../models/dbData';
import { Product } from '../models/Product';
import { InstagramMediaService } from '../service/instagram-media.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(public service: ProductService, public insta: InstagramMediaService) { }

  @Input()
  disableRipple: boolean = true;
  selected!: Product;
  productShown: boolean = false;
  showProductList: boolean = false;

  products: Product[] = [];

  ngOnInit(): void {
    this.service.getProducts().subscribe((data: DbData) => {
      data.body.forEach(product => {
        if (product.carousel.length > 0) {
          this.products.push(product);
          console.log('products pushed');

        }
      })
      console.log(this.products)
    });
    // this.insta.getPosts();
  }
}
