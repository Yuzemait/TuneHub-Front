import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService
    ) {
    this.loginForm = formBuilder.group({
      username: ['', Validators.required, Validators],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  onSubmit() {
    console.log('object');
    const userData = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };
    this.userService.login(userData).subscribe({}
    )
  }

}
