import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChatService } from 'src/app/shared/services/chat.service';


@Component({
  selector: 'app-chatpopup',
  templateUrl: './chatpopup.component.html',
  styleUrls: ['./chatpopup.component.scss']
})
export class ChatpopupComponent {
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ChatpopupComponent>,
    private chatService: ChatService
  ) { }

  buyShares(){
    console.log("here");
    let result: any = ''
    if(this.data.artist.ownChat && this.data.user.id){
      console.log(this.data.artist.ownChat);
      let chatId: string = this.data.artist.ownChat;
      let userId: string = this.data.user.id
      this.chatService.joinChat(chatId,userId).subscribe(
        (data)=>{
          result = data
        }
      )
    }
    return result
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
