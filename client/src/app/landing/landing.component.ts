import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';


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

  @ViewChild('landing') landing;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    console.log('component:', this.landing);
  }
}

