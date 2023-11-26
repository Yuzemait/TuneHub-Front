import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventService } from 'src/app/shared/services/event.service';
import { Event } from 'src/app/shared/interfaces/event';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent {
  artistId: string = '';
  editingEvent: Event | null = null; 
  eventId: string | null = null
  

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
    this.editingEvent = data.editingEventData || null; 
    this.eventId = data.eventId ? String(data.eventId) : null; 
    
    
    this.setupFormForEditing(); 
  }

  private setupFormForEditing() {
    if (this.editingEvent) {
      
      const isoDate = formatDate(this.editingEvent.date, 'yyyy-MM-dd', 'en-US');

      this.eventForm.patchValue({
        eventName: this.editingEvent.name,
        eventDate: isoDate,
        eventCategory: this.editingEvent.category,
      });
    }
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
  
      if (this.editingEvent) {
        this.eventService.editEvent(String(this.eventId), eventData).subscribe(
          (response) => {
            console.log('Evento editado con éxito:', response);
            this.dialogRef.close(response);
          },
          (error) => {
            console.error('Error al editar el evento:', error);
          }
        );
      } else {
        this.eventService.createEvent(eventData).subscribe(
          (response) => {
            console.log('Evento creado con éxito:', response);
            this.dialogRef.close(response);
          },
          (error) => {
            console.error('Error al crear el evento:', error);
          }
        );
      }
    } else {
      this.eventForm.markAllAsTouched();
    }
  }

}
