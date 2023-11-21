import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { LoginService } from 'src/app/shared/services/login.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { Router } from '@angular/router';
import { Token } from 'src/app/shared/interfaces/token';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent {
  signupForm: FormGroup;
  submitted = false;
  userAlreadyExists = false;

  constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService,
    private loginService: LoginService,
    private tokenService: TokenService,
    private router: Router
    ) {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required,Validators.minLength(8), this.comparePasswords.bind(this)]],
      terms: [false, Validators.requiredTrue]
    }, {
      validators: [() => this.comparePasswords()]
    });
  }

  comparePasswords() {
    if (!this.signupForm) return null;
  
    const { password, confirmPassword } = this.signupForm.getRawValue();
  
    if (password === confirmPassword) {
      return null;
    } else {
      return {
        match: true
      };
    }
  }

  hasError(controlName: string, errorName: string){
    return this.signupForm.controls[controlName].errors &&
      this.signupForm.controls[controlName].errors![errorName];
  }

  signup(): void {
    this.submitted = true;
  
    if (this.signupForm.valid) {
      const { username, email, password } = this.signupForm.value;
      
      this.userService.userRegister(username, email, password).subscribe({
        next: () => {
          alert('Registro exitoso. Favor de iniciar sesión')
          this.router.navigate(['login']);
          
        },
        error: (err) => {
          if (err.status === 400 && err.error.message === 'El usuario ya existe') {
            this.userAlreadyExists = true;
          } else {
            alert('No se pudo hacer el registro.');
          }
        }
      });
    }
  }
}
