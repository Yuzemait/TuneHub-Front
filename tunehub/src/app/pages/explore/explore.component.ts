import { Component } from '@angular/core';
import { ArtistService } from '../../shared/services/artist.service';
import { AlbumsService } from 'src/app/shared/services/albums.service';
import { SongService } from 'src/app/shared/services/song.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent {
  artists: any[] = [];
  albums: any[] = [];
  songs: any[] = [];

  constructor(private artistService: ArtistService, private albumService: AlbumsService, private songService: SongService) { }

  ngOnInit(): void {
    this.artistService.getAllArtists().subscribe(
      data => {
        this.artists = data;
        console.log("artist data: ", data);
      },
      error => {
        console.log(error);
      }
    );
    this.albumService.getAllAlbums().subscribe(
      data => {
        this.albums = data;
        //console.log(data);
      },
      error => {
        console.log(error);
      }
    )

    this.songService.getSongs().subscribe(
      data => {
        this.songs = data;
      },
      error =>{
        console.log(error);
      }
      
    )

  }

}
