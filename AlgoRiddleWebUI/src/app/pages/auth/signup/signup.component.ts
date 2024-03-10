import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, FormGroup, FormControl, Validators, ReactiveFormsModule, ValidatorFn, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { RegistrationModel } from "../../../models/registrationModel";

// Custom validator function to check if the email has a dot followed by at least one character
function dotFollowedByCharValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const email: string = control.value;
      const dotIndex: number = email.indexOf('.');
      if (dotIndex === -1 || dotIndex === email.length - 1) {
        return { invalidDot: true };
      }
      return null;
    };
  }

// Custom validator function to check if the passwords match
function passwordMatchValidator(controlName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const password = control.value;
        const confirmPassword = control.root.get(controlName)?.value;
        return password === confirmPassword ? null : { passwordMismatch: true };
    };
}

@Component({
    selector: 'app-signup',
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
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.css'
})
export class SignupComponent {
    constructor(private service: AuthService, private router: Router) {
    }
    hide = true;
    errorMessage: string = '';
    showError: boolean = false;

    signupForm = new FormGroup({
        email: new FormControl<string>('', [Validators.required, Validators.email, dotFollowedByCharValidator()]),
        password: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
        username: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl<string>('', [Validators.required, Validators.minLength(6), passwordMatchValidator('password')]),
    });

    getErrorMessageEmail() {
        if (this.signupForm.controls.email.hasError('required')) {
            return 'You must enter a value';
        }

        return (this.signupForm.controls.email.hasError('email') || this.signupForm.controls.email.hasError('invalidDot')) ? 'Not a valid email' : '';
    }

    getErrorMessagePassword() {
        if (this.signupForm.controls.password.hasError('required')) {
            return 'You must enter a value';
        }

        return this.signupForm.controls.password.hasError('minlength') ? 'Minimal length 6 characters' : '';
    }

    getErrorMessageConfirmPassword() {
        if (this.signupForm.controls.confirmPassword.hasError('required')) {
            return 'You must enter a value';
        }
        return this.signupForm.controls.confirmPassword.hasError('passwordMismatch') ? 'Passwords do not match' : '';
    }

    getErrorMessageUsername() {
        if (this.signupForm.controls.username.hasError('required')) {
            return 'You must enter a value';
        }

        return this.signupForm.controls.username.hasError('minlength') ? 'Minimal length 6 characters' : '';
    }

    onSubmit() {
        if (
            this.signupForm.controls.password.valid &&
            this.signupForm.controls.email.valid &&
            this.signupForm.controls.username.valid
        ) {
            const email_value = this.signupForm.controls.email.value;
            const password_value = this.signupForm.controls.password.value;
            const username_value = this.signupForm.controls.username.value;
    
            if (
                email_value !== null &&
                password_value !== null &&
                username_value !== null
            ) {
                const userRegistration: RegistrationModel = {
                    username: username_value,
                    email: email_value,
                    password: password_value,
                };
    
                this.service
                    .register(userRegistration)
                    .subscribe({
                        next: () => {
                            // Registration successful
                            // Now, log in the user
                            this.service.login(email_value, password_value)
                                .then(() => {
                                    // Login successful, navigate to dashboard
                                    this.router.navigateByUrl("/dashboard");
                                    // Hide the login and signup buttons after successful login
                                })
                                .catch(error => {
                                    // Remove "Firebase: " prefix from the error message
                                    this.errorMessage = error.message.replace("Firebase: ", "");
                                    this.showError = true; // Show error message
                                });
                        },
                        error: (error) => {
                            // Handle error
                            this.errorMessage = error.message;
                            this.showError = true; // Show error message
                        }
                    });
            } else {
                // add logic for nullability
            }
        }
    }
    




}
