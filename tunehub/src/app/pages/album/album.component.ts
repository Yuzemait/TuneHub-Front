import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Album } from 'src/app/shared/interfaces/album'
import { AlbumsService } from 'src/app/shared/services/albums.service';
import { Song } from 'src/app/shared/interfaces/song';
@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  albumId :string = ''
  selectedAlbum: Album = {id : '', title:  '', artist: '', releaseDate:'', songs:['']}
  songArray: [Song] =[{
    id: '',
    name: '', 
    song: '',
    date: new Date,
    artistID: "",
    artistName: "",
    views: 0,
    songImg: "",
  }]
 

  constructor(private route: ActivatedRoute,private albumService: AlbumsService) { }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.albumId = params['id'];
    });
    if(this.albumId){
      this.getSongsbyAlbumId()
      this.albumService.getAlbumById(this.albumId).subscribe(
        data => {
          this.selectedAlbum = data
          console.log(data);
        }
      )
      
    }
  }


  getSongsbyAlbumId(){
    this.selectedAlbum.songs = ['song']

  }

}
