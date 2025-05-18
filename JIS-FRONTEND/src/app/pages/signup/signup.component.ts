import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
 signupForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.signupForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      gender: ['', Validators.required],
      type: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  // Custom validator to check if password and confirmPassword match
  passwordMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      form.get('confirmPassword')?.setErrors(null);
    }
    return null;
  }

  onSubmit() {
    if (this.signupForm.valid) {
      alert('Registered Successfully');
      this.signupForm.reset();
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

   gotoLogin() {
    this.router.navigate(['/login']);
  }
}
