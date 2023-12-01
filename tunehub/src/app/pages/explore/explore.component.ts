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
  filteredArtists: any[] = [];
  albums: any[] = [];
  filteredAlbums: any[] = [];
  songs: any[] = [];
  searchQuery: string = '';

  constructor(private artistService: ArtistService, private albumService: AlbumsService, private songService: SongService) { }

  ngOnInit(): void {
    this.artistService.getAllArtists().subscribe(
      data => {
        this.artists = data;
        this.filteredArtists = data
        console.log("artist data: ", data);
      },
      error => {
        console.log(error);
      }
    );
    this.albumService.getAllAlbums().subscribe(
      data => {
        this.albums = data;
        
        this.filteredAlbums = data
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

  filterAlbums() {
    console.log("albums", this.albums);
    if(this.searchQuery){
      this.filteredAlbums = this.albums.filter(album => {
        return album.title.toLowerCase().includes(this.searchQuery.toLowerCase()); 
      });
  }
  else{
    this.filteredAlbums = this.albums
  }
  }
  filterArtists() {
    console.log("in filter artist");
    if(this.searchQuery){
      this.filteredArtists = this.artists.filter(artist => {
        return artist.username.toLowerCase().includes(this.searchQuery.toLowerCase()); 
      });
    }
    else{
      this.filteredArtists = this.artists
    }
  }

}
