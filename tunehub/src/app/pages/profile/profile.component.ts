import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { NgTemplateOutlet } from '@angular/common';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user: null = null;

  constructor(private userService: UserService){}
  
  ngOnInit(): void{
    this.loadUser();
  }

  loadUser(): void{


  }
  





}
