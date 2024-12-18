
import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  providers: [AuthService],  
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signupForm: FormGroup;
  passwordFieldType: string = 'password'; // Default password field type

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      gender: ['', Validators.required],
    });
  }

  onSignUp(): void {
    if (this.signupForm.valid) {
      console.log("hey");
      const formData = this.signupForm.value; 
      console.log(formData);
      this.authService.signup(formData).subscribe({
        next: (response) => {
          console.log('Signup successful:', response);
          alert('Account created successfully!');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Signup error:', error);
          alert('An error occurred during signup. Please try again.');
        },
      });
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }


  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
  
}
