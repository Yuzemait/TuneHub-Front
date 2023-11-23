import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() changesSaved: EventEmitter<void> = new EventEmitter<void>();

  
  user: User = { id: '', username: '', email: '', password: '', artistStatus: false }
  editForm: FormGroup;


  constructor(private userService: UserService, private formBuilder: FormBuilder) {
    this.editForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      this.user = user;
    });

    this.editForm.patchValue({
      username: this.user.username,
      email: this.user.email,
    });

  }
  
  onCancel() {
    this.cancel.emit();
  }

  saveChanges(): void {
    if (this.editForm.valid) {
      const { username, email } = this.editForm.value;

      this.userService.updateUser(this.user.id, username, email, this.user.password)
        .subscribe(
          (updatedUser) => {
            this.user = updatedUser;
            this.userService.setUser(updatedUser);
            this.changesSaved.emit();
            alert('Information successfully updated');
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



  
  
}

  

