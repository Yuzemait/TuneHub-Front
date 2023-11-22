import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistService } from '../../shared/services/artist.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {
  artist: any;
  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService
  ) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const artistId = params.get('id');
      if (artistId) {
        this.artistService.getArtistById(artistId).subscribe(
          data => {
            this.artist = data;
          },
          error => {
            console.error('Error fetching artist:', error);
          }
        );
      }
    });
  }

}
