import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/interfaces/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User = { id: '', username: '', email: '', password: '', artistStatus: false }
  isEditMode = false;
  isChangePasswordMode = false;
  editForm: FormGroup;
  changePasswordForm: FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder) {
    this.editForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
    });

    this.changePasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), this.comparePasswords.bind(this)]],
    });
  }

  ngOnInit(): void {
    this.userService.getUserData().subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error('Error al obtener datos del usuario:', error);
      }
    );
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode) {
      this.editForm.patchValue({
        username: this.user.username,
        email: this.user.email,
      });
    } else {
      this.editForm.reset();
    }
  }

  toggleChangePasswordMode(): void {
    this.isChangePasswordMode = !this.isChangePasswordMode;
    if (!this.isChangePasswordMode) this.changePasswordForm.reset();
  }

  saveChanges(): void {
    if (this.editForm.valid) {
      const { username, email } = this.editForm.value;

      this.userService.updateUser(this.user.id, username, email, this.user.password)
        .subscribe(
          (updatedUser) => {
            this.user = updatedUser;
            this.isEditMode = false;
          },
          (error) => {
            console.error('Error al actualizar usuario:', error);
          }
        );
    }
  }

  changePassword(): void {
    console.log(this.changePasswordForm.valid);
    if (this.changePasswordForm.valid) {
      const { newPassword } = this.changePasswordForm.value;
      console.log(newPassword);
        this.userService.updateUser(this.user.id, this.user.username, this.user.email, newPassword)
        .subscribe(
          (updatedUser) => {
            console.log(updatedUser);
            this.isChangePasswordMode = false;
            this.changePasswordForm.reset();
          },
          (error) => {
            console.error('Error al actualizar usuario:', error);
          }
        );
     }
  }


  hasError(controlName: string, errorName: string) {
    return this.editForm.controls[controlName].errors &&
      this.editForm.controls[controlName].errors![errorName];
  }

  hasPasswordError(controlName: string, errorName: string) {
    return this.changePasswordForm.controls[controlName].errors &&
      this.changePasswordForm.controls[controlName].errors![errorName];
  }

  comparePasswords() {
    if (!this.changePasswordForm) return null;
  
    const { newPassword, confirmPassword } = this.changePasswordForm.getRawValue();
  
    if (newPassword === confirmPassword) {
      return null;
    } else {
      return {
        match: true
      };
    }
  }
}
