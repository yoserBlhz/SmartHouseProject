import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  standalone: true,
  providers: [AuthService],  
    imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  signinForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signinForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSignIn(): void {
    if (this.signinForm.valid) {
      this.authService.signin(this.signinForm.value).subscribe({
        next: (response) => {
          console.log('Signin successful:', response);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Signin error:', error);
          this.errorMessage = error.error.message || 'An error occurred during signin. Please try again.';
        }
      });
    } else {
      this.errorMessage = 'Please fill in all required fields.';
    }
  }
}
