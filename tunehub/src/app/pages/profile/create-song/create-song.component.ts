import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SongService } from 'src/app/shared/services/song.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileComponent } from '../profile.component';
import { User } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrls: ['./create-song.component.scss']
})
export class CreateSongComponent {
  user: User = { id: '', username: '', email: '', password: '', artistStatus: false, address : '' , imgId: 'default.png', ownChat:""}
  constructor(private dialogRef: MatDialogRef<CreateSongComponent>, private formBuilder: FormBuilder, private songService: SongService, private userService: UserService) {
    
    this.songForm = this.formBuilder.group({
      // your existing form controls
      name: ['', [Validators.required, Validators.minLength(2)]],
      artistId: [''],
      artistName: ['']
    });
  }

  selectedFile: string = '';
  selectedSong: string = '';
  songForm: FormGroup;
  files: File[] = [];
  // songFile: File | null = null;

  ngOnInit() {
    this.userService.getUserData().subscribe(
      (data) => {
        this.user = data;
        this.userService.setUser(this.user);
        this.songForm.get('artistId')!.setValue(this.user.id)
        this.songForm.get('artistName')!.setValue(this.user.username)
      },
      (error) => {
        console.error('Error al obtener datos del usuario:', error);
      }
    );
    
  }

  onSubmit(): void {

    
    if (this.songForm.valid && this.files[0] && this.files[1]) {
      const formData = this.songForm.value;
      console.log("Submit");
      console.log(formData);
      this.songService.uploadSong(this.files,formData).subscribe(
        (data) => {
          console.log('Song uploaded successfully:', data);
          // Handle the response from the server if needed
        },
        (error) => {
          console.error('Error uploading song:', error);
        }
      );
    }
    this.closeDialog()
  }

  closeDialog() {
    this.dialogRef.close();
  }

  triggerFileInput(){
    const fileInput = document.getElementById("file-input");
    if (fileInput){
      fileInput.click();
    }
  }
  triggerSongInput(){
    const fileInput = document.getElementById("song-input");
    if (fileInput){
      fileInput.click();
    }
  }
  handleFileInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      // Access the selected file(s) from the files property
      this.files[0] = inputElement.files[0];
      // You can also display the file name or other information as needed
      if (this.files[0]) {
        this.selectedFile = this.files[0].name
      }
    }
  }
  handleSongInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      // Access the selected file(s) from the files property
      this.files[1] = inputElement.files[0];
      // You can also display the file name or other information as needed
      if (this.files[1]) {
        this.selectedSong = this.files[1].name
      }
    }
  }
}
