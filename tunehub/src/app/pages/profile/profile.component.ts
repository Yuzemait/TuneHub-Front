import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { NgTemplateOutlet } from '@angular/common';
import { User } from 'src/app/shared/interfaces/user';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user: User = { id: '', username: '', email: '', password: '', artistStatus: false }

  constructor(private userService: UserService){}
  
  ngOnInit(): void{
    this.userService.getUserData().subscribe(
      (data) => {
        this.user = data;
        console.log('Datos del usuario:', this.user);
      },
      (error) => {
        console.error('Error al obtener datos del usuario:', error);
      }
    );
  }


}
