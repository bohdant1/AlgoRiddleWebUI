import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { RegistrationModel } from "../../../models/registrationModel";

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
        email: new FormControl<string>('', [Validators.required, Validators.email]),
        password: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
        username: new FormControl<string>('', [Validators.required, Validators.minLength(6)])
    })

    getErrorMessageEmail() {
        if (this.signupForm.controls.email.hasError('required')) {
            return 'You must enter a value';
        }

        return this.signupForm.controls.email.hasError('email') ? 'Not a valid email' : '';
    }

    getErrorMessagePassword() {
        if (this.signupForm.controls.password.hasError('required')) {
            return 'You must enter a value';
        }

        return this.signupForm.controls.password.hasError('minlength') ? 'Minimal length 6 characters' : '';
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
                            // Registration successful, navigate to dashboard
                            this.router.navigateByUrl('/dashboard');
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
