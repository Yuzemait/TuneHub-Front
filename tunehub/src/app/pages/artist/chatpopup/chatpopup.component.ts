import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChatService } from 'src/app/shared/services/chat.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-chatpopup',
  templateUrl: './chatpopup.component.html',
  styleUrls: ['./chatpopup.component.scss']
})
export class ChatpopupComponent implements OnInit {
  price : any = 0
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ChatpopupComponent>,
    private chatService: ChatService,
    private snackBar: MatSnackBar
  ) {
    
  }
  

  ngOnInit(): void {
    this.chatService.getPrice(this.data.artistProfile.address)
      .subscribe(price => {
        this.price = price;
        console.log("price", this.price);
      }, error => {
        console.error("Error fetching price:", error);
      });
  }

  getPrice(){
    let x = this.chatService.getPrice(this.data.artistProfile.address)
    return x
  }

  buyShares(){
    
    let result: any = ''
    let message = 'wait while your transaction confirms'
    this.snackBar.open(message, 'Close', { duration: 10000 });
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
    let message = '';
    let url = 'https://goerli.basescan.org/tx/'
    if(info.transaction.sent === 'yes'){
      message = 'You successfully bought. Here is your transaction: ' + url+info.transaction.hash;
      this.closeDialog()
    } else if(info.transaction.sold === 'yes'){
      this.closeDialog()
      message = 'You successfully sold. Here is your transaction: ' + url+info.transaction.hash;
    } else {
      message = 'There was an error processing your transaction. Make sure you have funds.';
    }
    this.snackBar.open(message, 'Close', { duration: 10000 });
  }

  closeDialog() {
    this.dialogRef.close();
  }
  sellShares(){
    let message = 'wait while your transaction confirms'
    this.snackBar.open(message, 'Close', { duration: 10000 });
    let result: any = ''
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
