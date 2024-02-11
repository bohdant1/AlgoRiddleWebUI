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

@Component({
  selector: 'app-passwordreset',
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
  templateUrl: './passwordreset.component.html',
  styleUrl: './passwordreset.component.css'
})
export class PasswordresetComponent {
  constructor(private service: AuthService, private router: Router) { }

  errorMessage: string = '';
  showError: boolean = false;

  passwordResetForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email])
  })

  getErrorMessageEmail() {
    if (this.passwordResetForm.controls.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.passwordResetForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

  onSubmit() {
    if (this.passwordResetForm.controls.email.valid) {
      const email_value = this.passwordResetForm.controls.email.value;
      if (email_value !== null) {
        this.service.resetPassword(email_value).then(() => {
          // Login successful, navigate to dashboard
          this.router.navigateByUrl("/login");
        })
        .catch(error => {
          // Remove "Firebase: " prefix from the error message
          this.errorMessage = error.message.replace("Firebase: ", "");
          this.showError = true; // Show error message
        });
      }
    }
  }
}
