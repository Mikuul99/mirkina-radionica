import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.scss']
})
export class UpdateDialogComponent implements OnInit {
  
  updateForm!: FormGroup;
  additionalList: string[] = ['srce', 'oblakMali', 'oblakVeliki', 'zvezda', 'krunica', 'mesec', 'pletenica', 'bombona'];

  categoryList = [
    { name: 'Komplet', value: 'komplet' },
    { name: 'Gnezdo', value: 'gnezdo' }
  ];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.updateForm = this.fb.group({
      price: [this.product.price, Validators.required],
      carousel: this.fb.array(this.createCarouselFormControls(this.product.carousel), Validators.required),
      additional: this.createAdditionalFormArray(),
      dezen: [this.product.dezen, Validators.required],
      gnezdo: [this.product.gnezdo],
      komplet: this.fb.group({
        ogradica: [this.product.komplet.ogradica],
        masne: [this.product.komplet.masne],
        posteljina: [this.product.komplet.posteljina]
      }),
      category: [this.product.category]
    });
  }

  get carousel() {
    return this.updateForm.controls['carousel'] as FormArray;
  }

  get additional() {
    return this.updateForm.controls['additional'] as FormArray;
  }

  createAdditionalFormArray(): FormArray {
    const additionalFormArray = this.fb.array([]);

    this.additionalList.forEach((item) => {
      const control = this.fb.control(this.product.additional.includes(item));
      additionalFormArray.push(control);
    });

    return additionalFormArray;
  }

  onCheckChange(index: number): void {
    const formArray = this.updateForm.get('additional') as FormArray;
    const selectedValue = this.additionalList[index];
    const existingValueIndex = formArray.value.indexOf(selectedValue);
  
    if (existingValueIndex !== -1) {
      formArray.removeAt(existingValueIndex);
    } else {
      formArray.push(this.fb.control(selectedValue));
    }
  }

  toFormGroup = (productForm: AbstractControl) => productForm as FormGroup

  createCarouselFormControls(carouselData: any[]): FormGroup[] {
    return carouselData.map(image => {
      return this.fb.group({
        imageUrl: [image.imageUrl]
      });
    });
  }

  addImage(): void {
    const carouselArray = this.updateForm.get('carousel') as FormArray;
    carouselArray.push(this.fb.group({
      imageUrl: [''] // Set default imageUrl value here, or leave it empty
    }));
  }

  removeImage(index: number): void {
    const carouselArray = this.updateForm.get('carousel') as FormArray;
    carouselArray.removeAt(index);
  }

  onUpdate(): void {
    if (this.updateForm.valid) {
      const additionalArray = this.updateForm.get('additional') as FormArray;
      const selectedAdditionals = this.additionalList.filter((_, index) => additionalArray.at(index).value);
  
      const updatedProduct: Product = {
        ...this.product,
        ...this.updateForm.value,
        additional: selectedAdditionals,
      };
  
      this.dialogRef.close(updatedProduct); // Emit the updated product when the dialog is closed
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}