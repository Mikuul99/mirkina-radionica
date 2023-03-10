import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { ImageSliderComponent } from './image-slider.component';



@NgModule({
  declarations: [
    ImageSliderComponent
  ],
  imports: [
    CommonModule,
    MaterialDesignModule
  ],
  exports: [ImageSliderComponent]
})
export class ImageSliderModule { }
