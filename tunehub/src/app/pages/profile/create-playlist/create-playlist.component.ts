import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PlaylistService } from 'src/app/shared/services/playlist.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/interfaces/user';


@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.scss']
})
export class CreatePlaylistComponent {

  user: User = { id: '', username: '', email: '', password: '', artistStatus: false, address : '' , imgId: 'default.png', ownChat:""}
  constructor(private dialogRef: MatDialogRef<CreatePlaylistComponent>,private userService: UserService ,private formBuilder: FormBuilder, private playlistService: PlaylistService) {
    this.playlistForm = this.formBuilder.group({
      // your existing form controls
      name: ['', [Validators.required, Validators.minLength(2)]],
      creator: [''],
      songs: [[]]
    });
  }

  selectedFile: string = '';
  selectedSong: string = '';
  playlistForm: FormGroup;
  // songFile: File | null = null;

  ngOnInit() {
    this.userService.getUserData().subscribe(
      (data) => {
        this.user = data;
        this.userService.setUser(this.user);
        this.playlistForm.get('creator')!.setValue(this.user.id)
      },
      (error) => {
        console.error('Error al obtener datos del usuario:', error);
      }
    );
    
  }

  onSubmit(): void {

    
    if (this.playlistForm.valid) {
      const formData = this.playlistForm.value;
      console.log("Submit");
      this.playlistService.createPlaylist(formData).subscribe(
        (data) => {
          console.log('Playlist uploaded successfully:', data);
          // Handle the response from the server if needed
        },
        (error) => {
          console.error('Error uploading playlist:', error);
        }
      );
    }
    this.closeDialog()
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
