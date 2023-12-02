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
  userAlreadyExistsMessage: string = '';

  constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService,
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
          alert('Registro exitoso. Favor de iniciar sesión');
          this.router.navigate(['login']);
        },
        error: (err) => {
          if (err.status === 400 && (err.error.message.includes('email') || err.error.message.includes('username'))) {
            this.userAlreadyExists = true;
            this.userAlreadyExistsMessage = 'Ya hay un usuario registrado con este ' + (err.error.message.includes('email') ? 'correo electrónico.' : 'nombre de usuario.');
          } else {
            alert('No se pudo hacer el registro.');
          }
        }
      });
    }
  }

}
