import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ArtistService } from '../../shared/services/artist.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {
  id : string = '';
  artist: any;
  
  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (this.id) {
        this.artistService.getArtistById(this.id).subscribe(
          (data) => {
            this.artist = data;
          },
          (error) => {
            console.log('error getting artist', error);
          }
        );
      }
    });
  }
  

  }

    