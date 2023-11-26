import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent {
  artistId: string = '';

  eventForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EventComponent>,
    private formBuilder: FormBuilder,
    private eventService: EventService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.eventForm = this.formBuilder.group({
      eventName: ['', Validators.required], 
      eventDate: ['', Validators.required], 
      eventCategory: ['Concert', Validators.required], 
     
    });

    this.artistId = data.artistId;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  
  hasError(controlName: string, errorName: string) {
    return this.eventForm.controls[controlName].errors &&
      this.eventForm.controls[controlName].errors![errorName];
  }

  submitEvent() {
    if (this.eventForm.valid) {
      const eventData = {
        artistId: this.artistId,
        name: this.eventForm.value.eventName,
        date: this.eventForm.value.eventDate,
        category: this.eventForm.value.eventCategory,
      };

      this.eventService.createEvent(eventData).subscribe(
        (response) => {
          console.log('Evento creado con éxito:', response);
          this.dialogRef.close(response);
        },
        (error) => {
          console.error('Error al crear el evento:', error);
        }
      );
      
      
    }else{
      this.eventForm.markAllAsTouched();
    }



  
  }
}
