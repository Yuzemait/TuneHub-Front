import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent {
  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService
    ) {
    this.signupForm = formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      // Extract the form data
      const userData = {
        username: this.signupForm.value.username,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
      };
  
      // Use the UserService to send the data
      this.userService.createUser(userData).subscribe(
        response => {
          console.log('User created successfully', response);
        },
        error => {
          console.error('Error occurred while creating user', error);
          // Handle errors
        }
      );
    }
  }
  

}
