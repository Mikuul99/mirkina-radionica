import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { DbData } from 'src/app/models/dbData';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isLoading: boolean = false;
  form!: FormGroup;
  loginResponse!: number;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.form.controls; }

  onLogin() {
    this.isLoading = true;
    const val = this.form.value;
    console.log(val);

    this.authService.login(val.email, val.password).subscribe(data => {
      if (val.email && val.password) {
        localStorage.setItem('id_token', data.body.token);
        this.router.navigateByUrl('/admin/panel');
      }
    });
  }

  isLoggedIn() {
    console.log(this.authService.isLoggedIn());
  }

  onLogout() {
    this.authService.logout();
  }

  // errorHandler(error) {
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     // Get client-side error
  //     errorMessage = error.error.message;
  //   } else {
  //     // Get server-side error
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   console.log(errorMessage);
  //   return throwError(errorMessage);
  // }

}
