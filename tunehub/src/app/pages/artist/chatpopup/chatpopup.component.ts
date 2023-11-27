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
  ) {}

  buyShares(){
    
    let result: any = ''
    console.log(this.data.artistProfile.id);
    if( this.data.userProfile.id){
      console.log("here");
      let chatId: string = this.data.artistProfile.ownChat;
      let userId: string = this.data.userProfile.id
      this.chatService.joinChat(chatId,userId).subscribe(
        (data)=>{
          result = data
          this.launchAnnouncement(result)
          console.log("result: " , result.transaction);
        }
      )
      return result
    }
    else{
      return 'failed'
    }
  }
  launchAnnouncement(info: any): void {

    if(info.transaction.sent == 'yes'){
      alert('you succesfully bought. here is your transaction: '+info.transaction.hash);
    }
    if(info.transaction.sold == 'yes'){
      alert('you succesfully sold here is your transaction:: '+info.transaction.hash);
    }
    else{
      alert('there was an error processing your transaction make sure you have funds '+info.transaction.hash);

    }

    
  }

  closeDialog() {
    this.dialogRef.close();
  }
  sellShares(){
    let result: any = ''
    console.log(this.data.artistProfile.id);
    if( this.data.userProfile.id){
      console.log("here");
      let chatId: string = this.data.artistProfile.ownChat;
      let userId: string = this.data.userProfile.id
      this.chatService.leaveChat(chatId,userId).subscribe(
        (data)=>{
          result = data
          this.launchAnnouncement(result)
        }
      )
      return result
    }
    else{
      return 'failed'
    }

  }
}
