import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit{
  user: User = { id: '', username: '', email: '', password: '', artistStatus: false }
  changePasswordForm: FormGroup;
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() changesSaved: EventEmitter<void> = new EventEmitter<void>();


  constructor(private userService: UserService, private formBuilder: FormBuilder){
    this.changePasswordForm = this.formBuilder.group({
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8), this.comparePasswords.bind(this)]],
});
  }

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  changePassword(): void {
    if (this.changePasswordForm.valid) {
      const { newPassword } = this.changePasswordForm.value;
        this.userService.updateUser(this.user.id, this.user.username, this.user.email, newPassword)
        .subscribe(
          (updatedUser) => {
            this.changePasswordForm.reset();
            this.changesSaved.emit();
            alert('Password changed successfully.')
          },
          (error) => {
            console.error('Error al actualizar usuario:', error);
          }
        );
     }
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

  onCancel() {
    this.cancel.emit();
  }

}
