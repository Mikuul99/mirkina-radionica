import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, AbstractControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { empty } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {

  addForm!: FormGroup;
  additionalList: string[] = ['srce', 'oblakMali', 'oblakVeliki', 'zvezda', 'krunica', 'mesec', 'pletenica', 'bombona'];

  categoryList = [
    { name: 'Komplet', value: 'komplet' },
    { name: 'Gnezdo', value: 'gnezdo' }
  ];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddDialogComponent>,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.addForm = this.fb.group({
      price: ['', Validators.required],
      carousel: this.fb.array([], Validators.required),
      additional: this.fb.array([]),
      dezen: ['', Validators.required],
      gnezdo: [''],
      komplet: this.fb.group({
        ogradica: [''],
        masne: [''],
        posteljina: ['']
      }),
      category: ['']
    });
  }

  get carousel() {
    return this.addForm.controls['carousel'] as FormArray;
  }

  get additional() {
    return this.addForm.controls['additional'] as FormArray;
  }

  toFormGroup = (carouselItem: AbstractControl) => carouselItem as FormGroup;

  createCarouselFormControls(carouselData: any[]): FormGroup[] {
    return carouselData.map(image => {
      return this.fb.group({
        imageUrl: [image.imageUrl]
      });
    });
  }

  addImage(): void {
    this.carousel.push(this.fb.group({
      imageUrl: [null] // Set default imageUrl value here, or leave it null
    }));
  }

  removeImage(index: number): void {
    this.carousel.removeAt(index);
  }

  onCheckChange(event: any, item: string) {
    const additionalArray = this.addForm.get('additional') as FormArray;
    if (event.checked) {
      additionalArray.push(this.fb.control(item));
    } else {
      const index = additionalArray.controls.findIndex(control => control.value === item);
      if (index >= 0) {
        additionalArray.removeAt(index);
      }
    }
  }

  onAdd(): void {
    if (this.addForm.valid) {
      const newProduct: Product = {
        ...this.addForm.value,
      };
      this.dialogRef.close(newProduct);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
