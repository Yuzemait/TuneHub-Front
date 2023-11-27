import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/interfaces/user';
import { MatDialog } from '@angular/material/dialog';
import { EventComponent } from 'src/app/pages/event/event.component';
import { ChatService } from 'src/app/shared/services/chat.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User = { id: '', username: '', email: '', password: '', artistStatus: false, address : '',ownChat:'' }
  isEditProfileVisible = false;
  isChangePasswordVisible = false;

  constructor(private userService: UserService, public dialog: MatDialog, private chatService: ChatService) {}

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
  formatAddress(address: string): string {
    // Check if the address is valid and long enough
    if (address && address.length > 10) {
      // Show the first 6 characters, ellipses, and the last 4 characters
      return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    }
    return address;
  }

  copyAddressToClipboard(address: string|undefined) {
    if(!address){
      address = ''
    }
    console.log(address);
    navigator.clipboard.writeText(address).then(() => {
        // You can add some logic here to show a confirmation message
        console.log('Address copied to clipboard');
    }).catch(err => {
        console.error('Could not copy text: ', err);
    });
  }
  createChat(user: User){
    this.chatService.createChat(this.user.id, this.user.username).subscribe(
      (data) => {
       
        console.log(data);
      },
      (error) => {
        console.error('Error al obtener datos del usuario:', error);
      }
    );
  }
  hasChat(user: User){
    if(this.user.ownChat){
      return true
    }
    else return false    
  }


}

