import { Component, Input, OnInit } from '@angular/core';
import { DbData } from '../models/dbData';
import { Product } from '../models/Product';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(public service: ProductService) { }

  @Input()
  disableRipple: boolean = true;


  sorterValues: string[] = ['novo', 'rastuće', 'opadajuće'];
  filterValues: string[] = ['gnezdo', 'komplet'];
  filter = '';
  sorter = '';
  products: Product[] = [];
  shownProducts: Product[] = [];
  filteredProducts: Product[] = [];
  sortedPorducts: Product[] = [];
  sorted!: boolean;
  filtered!: boolean;
  selectedFilterButton = '';
  selectedSorterButton = '';

  ngOnInit(): void {
    this.service.getProducts().subscribe((data: DbData) => {
      data.body.forEach(product => {
        if (product.carousel.length > 0) {
          this.products.push(product);
          console.log('products pushed');
        }
        this.shownProducts = this.products;
      })
      console.log(this.products)
    });
  }

  onChange(value: string, type: string) {

    if (type === 'filter') {
      this.filter = value;
      this.selectedFilterButton = value;
      this.filterProducts();
    } else if (type === 'sorter') {
      this.sorter = value;
      this.selectedSorterButton = value;
      this.sortProducts();
    }
  }

  filterProducts() {
    if (this.filter === '') {
      this.filtered = false;
      this.shownProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product => product.category === this.filter);
      this.filtered = true;
      this.shownProducts = this.filteredProducts;
      this.sortProducts();
    }
  }

  sortProducts() {
    if (this.sorter === 'novo') {
      this.sortedPorducts = this.filtered ? this.filteredProducts.slice().reverse() : this.products.slice().reverse();
    } else if (this.sorter === 'rastuće') {
      this.sortedPorducts = this.filtered ? this.filteredProducts.slice().sort((a, b) => a.price - b.price) : this.products.slice().sort((a, b) => a.price - b.price);
      this.sorted = true;
    } else if (this.sorter === 'opadajuće') {
      this.sortedPorducts = this.filtered ? this.filteredProducts.slice().sort((a, b) => b.price - a.price) : this.products.slice().sort((a, b) => b.price - a.price);
      this.sorted = true;
    } else if (this.sorter === '') {
      this.sortedPorducts = this.filteredProducts;
    }
    this.shownProducts = this.sortedPorducts;
  }

  deselectFilter() {
    this.filter = '';
    this.selectedFilterButton = '';
    this.filtered = false;
    this.shownProducts = this.products;
  }

  deselectSorter() {
    this.sorter = '';
    this.selectedSorterButton = '';
    this.sorted = false;
    this.shownProducts = this.filtered ? this.filteredProducts : this.products;
  }

}
