import { Component } from '@angular/core';
import { ArtistService } from '../../shared/services/artist.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent {
  artists: any[] = [];

  constructor(private artistService: ArtistService) { }

  ngOnInit(): void {
    this.artistService.getAllArtists().subscribe(
      data => {
        this.artists = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

}
