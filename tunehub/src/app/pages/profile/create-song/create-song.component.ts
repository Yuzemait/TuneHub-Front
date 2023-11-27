import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SongService } from 'src/app/shared/services/song.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrls: ['./create-song.component.scss']
})
export class CreateSongComponent {
  constructor(private dialogRef: MatDialogRef<CreateSongComponent>, private formBuilder: FormBuilder, private songService: SongService) {
    this.signupForm = this.formBuilder.group({
      // your existing form controls
      name: ['', [Validators.required, Validators.minLength(2)]],
      artistID: ['']
    });
  }

  selectedFile: string = '';
  selectedSong: string = '';
  signupForm: FormGroup;
  files: File[] = [];
  // songFile: File | null = null;

  ngOnInit() {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
  
    // Check if the token is not null or undefined before setting the value
    if (token) {
      // Set the 'artistId' form control value
      this.signupForm.get('artistID')!.setValue(token);
    }
  }

  onSubmit(): void {

    
    if (this.signupForm.valid && this.files[0] && this.files[1]) {
      const formData = this.signupForm.value;
      console.log("Submit");
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
