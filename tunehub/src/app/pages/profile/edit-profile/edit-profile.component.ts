import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { TokenService } from 'src/app/shared/services/token.service';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/shared/services/chat.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() changesSaved: EventEmitter<void> = new EventEmitter<void>();

  
  user: User = { id: '', username: '', email: '', password: '', artistStatus: false , imgId: ''}
  editForm: FormGroup;
  selectedFile: string = '';
  userAlreadyExists = false;
  userAlreadyExistsMessage: string = '';
  imgFile: File | null = null;


  constructor(
    private chatService: ChatService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private tokenService: TokenService,
    private  router: Router,
    private snackBar: MatSnackBar) {
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
  
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000, 
      verticalPosition: 'top'
    });
  }
  
  onCancel() {
    this.cancel.emit();
  }

  saveChanges(): void {
    if (this.editForm.valid) {
      const { username, email } = this.editForm.value;
  
      this.userService.updateUser(this.user.id, username, email, null, this.user.artistStatus, this.imgFile)
        .subscribe(
          (updatedUser) => {
            this.user = updatedUser;
            this.userService.setUser(updatedUser);
            this.changesSaved.emit();
            this.openSnackBar('Information successfully updated', 'Ok');
          },
          (error) => {
            console.error('Error al actualizar usuario:', error);
            console.log(error.error.error);
  
            if (error.status === 400 && (error.error.error.includes('email') || error.error.error.includes('username'))) {
              this.userAlreadyExists = true;
              this.userAlreadyExistsMessage = 'Ya hay un usuario registrado con este ' + (error.error.error.includes('email') ? 'correo electrónico.' : 'nombre de usuario.');
              console.log(this.userAlreadyExistsMessage);
            } else {
              alert('No se pudo hacer la actualización.');
            }
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

        this.userService.updateUser(this.user.id, this.user.username, this.user.email, null, true, this.imgFile)
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
  triggerFileInput(){
    const fileInput = document.getElementById("file-input");
    if (fileInput){
      fileInput.click()
    }
  }

  handleFileInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      // Access the selected file(s) from the files property
     this.imgFile = inputElement.files[0];
      // You can also display the file name or other information as needed
      if (this.imgFile) {
        this.selectedFile = this.imgFile.name
      }
    }
  }
  
  
}

  

