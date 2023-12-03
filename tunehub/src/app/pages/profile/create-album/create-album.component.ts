import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/shared/interfaces/user';
import { SongService } from 'src/app/shared/services/song.service';
import { UserService } from 'src/app/shared/services/user.service';
import { AlbumsService } from 'src/app/shared/services/albums.service';

@Component({
  selector: 'app-create-album',
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.scss']
})
export class CreateAlbumComponent {
  user: User = { id: '', username: '', email: '', password: '', artistStatus: false, address : '' , imgId: 'default.png', ownChat:""}
  constructor(private dialogRef: MatDialogRef<CreateAlbumComponent>,
     private formBuilder: FormBuilder,
      private albumService: AlbumsService,
      private songService: SongService,
       private userService: UserService) {
    
    this.albumForm = this.formBuilder.group({
      // your existing form controls
      name: ['', [Validators.required, Validators.minLength(2)]],
      artistId: [''],
      artistName: ['']
    });

    this.songForm = this.formBuilder.group({
      // your existing form controls
      name: [''],
      artistId: [''],
      artistName: ['']
    });
  }

  selectedFile: string = '';
  selectedSong: string[] = [];
  albumForm: FormGroup;
  songForm: FormGroup;
  files: File[][] = [];
  file: File[] = [];
  numberOfSongs = 1;
  uploadedSongs: string[] = [];

  ngOnInit() {

    this.files[0] = [];
    this.files[1] = [];
    this.userService.getUserData().subscribe(
      (data: User) => {
        this.user = data;
        this.userService.setUser(this.user);
        this.albumForm.get('artistId')!.setValue(this.user.id)
        this.albumForm.get('artistName')!.setValue(this.user.username)
      },
      (error: any) => {
        console.error('Error al obtener datos del usuario:', error);
      }
    );
    
  }

  async onSubmit(): Promise<void> {

    if (this.selectedSong.length != 0){
      for (let i = 0; i < this.selectedSong.length; i++) {
        const songFile = this.selectedSong[i];
        const song = document.getElementById('song-'+songFile) as HTMLInputElement
        const songName = song ? song.value : 'Not Defined';
        this.songForm = this.formBuilder.group({
          name: [songName],
          artistId: [this.user.id],
          artistName: [this.user.username]
        });

        if (this.songForm.valid && this.files[0] && this.files[1]) {
          this.file = [this.files[0][0], this.files[1][i]]
          const formData = this.songForm.value;
          console.log("Submit");
          console.log(formData);
          await this.songService.uploadSong(this.file,formData).subscribe(
            (data) => {
              console.log('Song uploaded successfully:', data);
              this.uploadedSongs.push(data.id);
              

              // Handle the response from the server if needed
            },
            (error) => {
              console.error('Error uploading song:', error);
            }
          );
        }
        
      }
    }
    if (this.albumForm.valid && this.files[0] && this.files[1]) {
      const formData = this.albumForm.value;
      console.log("Submit");
      console.log(formData);
      this.albumService.uploadAlbum(this.files[0][0],formData, this.uploadedSongs).subscribe(
        (data) => {
          console.log('album uploaded successfully:', data);
          // Handle the response from the server if needed
        },
        (error) => {
          console.error('Error uploading album:', error);
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

  // addSong() {
  //   this.numberOfSongs++;
  // }

  handleFileInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      // Access the selected file(s) from the files property
      this.files[0][0] = inputElement.files[0];
      // You can also display the file name or other information as needed
      if (this.files[0][0]) {
        this.selectedFile = this.files[0][0].name
        console.log(this.files[0][0]);
        
      }
    }
  }
  handleSongInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      // Access the selected file(s) from the files property
      this.files[1].push(inputElement.files[0])
      // You can also display the file name or other information as needed
      this.selectedSong.push(this.files[1][this.files[1].length-1].name)
    }
  }

  range(start: number, end: number, step: number = 1): number[] {
    const result = [];
    for (let i = start; i < end; i += step) {
      result.push(i);
    }
    return result;
  }
}
