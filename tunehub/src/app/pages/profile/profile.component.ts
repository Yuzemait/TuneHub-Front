import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/interfaces/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EventComponent } from 'src/app/pages/event/event.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User = { id: '', username: '', email: '', password: '', artistStatus: false }
  isEditProfileVisible = false;
  isChangePasswordVisible = false;

  constructor(private userService: UserService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.userService.getUserData().subscribe(
      (data) => {
        this.user = data;
        this.userService.setUser(this.user);
      },
      (error) => {
        console.error('Error al obtener datos del usuario:', error);
      }
    );
  }

  showEditProfile() {
    this.isEditProfileVisible = true;
  }

  hideEditProfile() {
    this.isEditProfileVisible = false;
  }

  showChangePassword() {
    this.isChangePasswordVisible = true;
    this.isEditProfileVisible = false;
  }

  hideChangePassword() {
    this.isChangePasswordVisible = false;
  }

  onChangesSaved() {
    this.hideEditProfile();
    this.hideChangePassword();
    this.userService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  onChangePassword() {
    this.hideChangePassword();
    this.hideEditProfile();
  }
  openAddEventDialog() {
    const dialogRef = this.dialog.open(EventComponent, {
      width: '30%',
      // You can pass data or configuration here
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Handle results if needed
    });
  }


}

