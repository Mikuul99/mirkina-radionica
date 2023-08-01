import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbData } from 'src/app/models/dbData';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {

  productId = this.route.snapshot.params.id;
  product!: Product;
  carousel: string[] = [];

  
  constructor(
    private route: ActivatedRoute,
    private service: ProductService) { }

  ngOnInit(): void {
    this.service.getProduct(this.productId).subscribe((result: DbData) => {
      console.log('product fetched');
      this.product = result.body;
      this.product.carousel.forEach(image => {
        this.carousel.push(image.imageUrl)
      })
      console.log(this.product);
    })
  }
  
  returnNaslov(): string {
    if (this.product.category === 'komplet') {
      return 'Komplet za bebi krevetac';
    } else if (this.product.category === 'gnezdo') {
      return 'Bebi gnezdo';
    }
    return '';
  }
  
  returnOgradica(): string {
    if (this.product.komplet.ogradica === 'silikon') {
      return 'Ogradica';
    } else if (this.product.komplet.ogradica === 'sunđer') {
      return 'Ravna ogradica'
    } else if (this.product.komplet.ogradica === 'silikon/karneri') {
      return 'Ogradica sa karnerima'
    } else if (this.product.komplet.ogradica === 'sunđer/karneri') {
      return 'Ravna ogradica sa karnerima'
    } else if (this.product.komplet.ogradica === 'jastuci') {
      return 'Ogradica od jastučića'
    }
    return '';
  }
  
  returnPosteljina(): string {
    if (this.product.komplet.posteljina === 'jorgan' || 'jorgance') {
      return 'jorgančeta';
    } else if (this.product.komplet.posteljina === 'navlaka') {
      return 'navlake za jorganče';
    } else if (this.product.komplet.posteljina === 'jorgan/navlaka' || 'jorgance/navlaka') {
      return 'jorgančeta i navlake za jorganče';
    }
    return '';
  }
  
}
