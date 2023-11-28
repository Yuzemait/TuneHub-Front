import { Component } from '@angular/core';
import { CreatePlaylistComponent } from '../create-playlist/create-playlist.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {

  constructor(public dialog: MatDialog){

  }


  openAddPlaylistDialog() {
    const dialogRef = this.dialog.open(CreatePlaylistComponent, {
      width: '30%',
      // You can pass data or configuration here
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Handle results if needed
    });
  }
}
