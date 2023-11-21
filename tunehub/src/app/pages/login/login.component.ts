import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Token } from 'src/app/shared/interfaces/token';
import { LoginService } from 'src/app/shared/services/login.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  incorrectCredentials = false; 

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

  }

  hasError(controlName: string, errorName: string) {
    return this.loginForm.controls[controlName].errors && this.loginForm.controls[controlName].errors![errorName];
  }

  login(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.loginService.login(email, password).subscribe({
        next: (response: Token) => {
          this.tokenService.save(response.token);
          this.router.navigate(['profile']);
          console.log('Inicio de sesión exitoso');
        },
        error: (err) => {
          if (err.status === 401 && err.error.message === 'Correo o contraseña incorrectos') {
            this.incorrectCredentials = true;
          } else {
            console.error('Error en el inicio de sesión:', err);
            alert('No se pudo iniciar sesión.');
          }
        }
      });
    }
  }
}
