import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { empty } from 'rxjs';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  reloadLink = this.activatedRoute.snapshot.outlet;
  productForm!: FormGroup;
  additionalList: Array<any> = [
    {name: 'Srce', value: 'srce'},
    {name: 'Oblak mali', value: 'oblakMali'},
    {name: 'Oblak veliki', value: 'oblakVeliki'},
    {name: 'Zvezda', value: 'zvezda'},
    {name: 'Krunica', value: 'krunica'},
    {name: 'Mesec', value: 'mesec'},
    {name: 'Pletenica', value: 'pletenica'},
    {name: 'Bombona', value: 'bombona'}
  ]

  categoryList: Array<any> = [
    {name: 'Komplet', value: 'komplet'},
    {name: 'Gnezdo', value: 'gnezdo'}
  ]

  carouselList: Array<string> = [
  ]

  ngOnInit(): void {
    this.productForm = this.fb.group({
      category: [''],
      komplet: this.fb.group({
        ogradica: [''],
        masne: [''],
        posteljina: ['']
    }),
      gnezdo: [''],
      additional: this.fb.array([]),
      dezen: [''],
      carousel: this.fb.array([]),
      price: ['']
  })
}

constructor(
  public fb: FormBuilder,
  private router: Router,
  public service: ProductService,
  private activatedRoute: ActivatedRoute
) { }

get carousel() {
  return this.productForm.controls['carousel'] as FormArray;
}

addImage() {
  const imageForm = this.fb.group({
    imageUrl: ['']
  })
  this.carousel.push(imageForm)
}

removeImage(index) {
  this.carousel.removeAt(index);
}

toFormGroup = (productForm: AbstractControl) => productForm as FormGroup

onCheckChange(event) {
  const formArray: FormArray = this.productForm.get('additional') as FormArray;
  
  /* Selected */
  if(event.checked){
    // Add a new control in the arrayForm
    formArray.push(new FormControl(event.source.value));
  }
  /* unselected */
  else{
    // find the unselected element
    let i: number = 0;

    formArray.controls.forEach(ctrl => {
      if(ctrl.value == event.source.value) {
        // Remove the unselected element from the arrayForm
        formArray.removeAt(i);
        return;
      }

      i++;
    });
  }
}

submitForm() {
  this.service.createProduct(this.productForm.value).subscribe(res => {
    console.log('Product Created!');
    if(res) {
      this.router.navigate(['/admin/panel'])
      console.log(this.productForm.value);
    }
  })
  
}  

}
