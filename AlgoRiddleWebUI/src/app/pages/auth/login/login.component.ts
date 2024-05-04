import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

/** @title Simple form field */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports: [CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule],
})
export class LoginComponent implements OnInit {

  constructor(private service: AuthService, private router: Router, private route: ActivatedRoute,) { }

  hide = true;
  returnUrl: string;

  errorMessage: string = '';
  showError: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(6)])
  })

  getErrorMessageEmail() {
    if (this.loginForm.controls.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessagePassword() {
    if (this.loginForm.controls.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.controls.password.hasError('minlength') ? 'Minimal length 6 characters' : '';
  }

  ngOnInit(): void {
    // Get the return URL from query parameters
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }


  onSubmit() {
    if (this.loginForm.controls.password.valid && this.loginForm.controls.email.valid) {
      const email_value = this.loginForm.controls.email.value;
      const password_value = this.loginForm.controls.password.value;
      if (email_value !== null && password_value !== null) {
        this.service.login(email_value, password_value)
          .then(() => {
            // Login successful, navigate to dashboard
            this.router.navigateByUrl(this.returnUrl);
          })
          .catch(error => {
            // Remove "Firebase: " prefix from the error message
            this.errorMessage = error.message.replace("Firebase: ", "");
            this.showError = true; // Show error message
          });
      } else {
        // add logic for nullability
      }
    }
  }
  
}