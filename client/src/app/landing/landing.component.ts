import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../service/product.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { interval } from 'rxjs';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {

  index: number = 0;
  numImages: number = 4;
  imagesLoaded: number = 0;
  loading: boolean = true;

  @ViewChild('aboutUs') aboutUs;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    console.log(this.aboutUs);
  }
}

