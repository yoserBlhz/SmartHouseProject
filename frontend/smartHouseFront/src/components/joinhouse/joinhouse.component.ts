import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-joinhouse',
  standalone: true,
    providers: [AuthService],  
      imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './joinhouse.component.html',
  styleUrl: './joinhouse.component.scss'
})
export class JoinhouseComponent implements OnInit  {
loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]]
          });
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.authService.join(this.loginForm.value).subscribe(
        (response) => {
          // Handle successful login
          console.log(response);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          // Handle login error
          console.error(error);
        }
      );
    }
  }
}


