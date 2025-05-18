import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  imageSrc: string = 'images/img1.jpg';
  imageno: number = 1;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });

    setInterval(() => {
      this.rotateImage();
    }, 1000);

    const auth = localStorage.getItem('user');
    if (auth) {
      this.router.navigate(['/']);
    }
  }

  rotateImage(): void {
    this.imageno = this.imageno === 9 ? 1 : this.imageno + 1;
    this.imageSrc = `images/img${this.imageno}.jpg`;
  }

  onLogin(): void {
    const { userName, password } = this.loginForm.value;
    if (this.loginForm.valid) {
      // Simulate login success
      localStorage.setItem('user', JSON.stringify({ userName }));
      alert('Login Successful!');
      this.router.navigate(['/']);
    } else {
      alert('Enter username and password');
    }
  }

  goToSignup(): void {
    this.router.navigate(['/signup']);
  }
}
