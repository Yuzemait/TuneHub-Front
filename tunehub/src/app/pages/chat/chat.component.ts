import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ArtistService } from '../../shared/services/artist.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  id : string = '';
  chat: any;
  
  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      console.log(this.id);
      if (this.id) {
        this.artistService.getChatbyArtistId(this.id).subscribe(
          
          (data) => {
            this.chat = data;
            console.log(data);
          },
          (error) => {
            console.log('error getting artist', error);
          }
        );
      }
    });
  }

}

