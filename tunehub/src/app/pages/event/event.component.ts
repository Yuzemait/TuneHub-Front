import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent {
  constructor(private dialogRef: MatDialogRef<EventComponent>) {}

  closeDialog() {
    this.dialogRef.close();
  }

}



