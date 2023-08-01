import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { DbData } from 'src/app/models/dbData';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  form!: FormGroup;
  loginSuccess!: boolean;
  loginErrorMessage!: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  logout() {
    this.authService.logout();
  }

  onSubmit() {
    if (this.form.valid) {
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;
      this.authService.login(email, password).subscribe(
        (data: DbData) => {
          // Handle login success
          localStorage.setItem('id_token', data.body.token);
          this.router.navigate(['/admin']);
          this.loginSuccess = true;
        },
        (error) => {
          // Handle login error
          console.error('Login failed:', error);
          this.loginErrorMessage = error.error.message.slice(7);
          if (this.loginErrorMessage === 'User Not Found') {
            this.loginErrorMessage = 'Nije pronađen korisnik';
          }
          else if (this.loginErrorMessage === 'Invalid Password') {
            this.loginErrorMessage = 'Password nije ispravan'
          }
          setTimeout(() => {
            this.form.reset();
          });
          this.loginSuccess = false;
        }
      );
    }
  }
}

