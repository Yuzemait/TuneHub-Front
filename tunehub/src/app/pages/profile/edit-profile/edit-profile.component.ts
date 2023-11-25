import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { TokenService } from 'src/app/shared/services/token.service';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/shared/services/chat.service';

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


  constructor(
    private chatService: ChatService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private tokenService: TokenService,
    private  router: Router) {
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

      this.userService.updateUser(this.user.id, username, email, null, this.user.artistStatus)
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

  upgrade(){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmación',
        message: '¿Estás seguro de que deseas actualizar tu cuenta a artista? Esta acción cerrará tu sesión actual y dejarás de tener acceso a tus playlists. No se podrá revertir cambios.'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.userService.updateUser(this.user.id, this.user.username, this.user.email, null, true)
        .subscribe(
          (updatedUser) => {
            console.log(updatedUser);
            this.user = updatedUser;
            this.tokenService.remove();
            this.router.navigate(['login'])
          },
          (error) => {
            console.error('Error al actualizar usuario:', error);
          }
        );

        this.chatService.joinChat(this.user.id, this.user.username)
        
      }
    });

  

     

  }
  
  
}

  

