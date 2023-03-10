import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent implements OnInit {

  @Input() slides: any[] = [];

  currentIndex: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  getCurrentSlideUrl(): string {
    return `url('${this.slides[this.currentIndex]}')`
  }

  goToNext(): void {
    const isLastSlide = this.currentIndex === this.slides.length - 1;
    const newIndex = isLastSlide ? 0: this.currentIndex + 1;
    this.currentIndex = newIndex;
  }

  goToPrevious(): void {
    const isFirstSlide = this.currentIndex === 0;
    const newIndex = isFirstSlide ? this.slides.length - 1: this.currentIndex - 1;
    this.currentIndex = newIndex;
  }
}
