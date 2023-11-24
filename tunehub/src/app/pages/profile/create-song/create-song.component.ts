import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrls: ['./create-song.component.scss']
})
export class CreateSongComponent {
  constructor(private dialogRef: MatDialogRef<CreateSongComponent>) {}

  selectedFile: string = '';
  selectedSong: string = '';


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
      const file = inputElement.files[0];
      // You can also display the file name or other information as needed
      if (file) {
        this.selectedFile = file.name
      }
    }
  }
  handleSongInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      // Access the selected file(s) from the files property
      const file = inputElement.files[0];
      // You can also display the file name or other information as needed
      if (file) {
        this.selectedSong = file.name
      }
    }
  }
}
