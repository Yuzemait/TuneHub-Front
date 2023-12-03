import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Album } from 'src/app/shared/interfaces/album'
import { AlbumsService } from 'src/app/shared/services/albums.service';
import { Song } from 'src/app/shared/interfaces/song';
import { SongService } from 'src/app/shared/services/song.service';
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
  artist: string = ''
  albumImg: string = ''
 

  constructor(private route: ActivatedRoute,private albumService: AlbumsService, private songService: SongService) { }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.albumId = params['id'];
    });
    if(this.albumId){
      
      this.albumService.getAlbumById(this.albumId).subscribe(
        data => {
          this.selectedAlbum = data
          console.log(data);
          this.getSongsbyAlbumId()
        }
      )
      
    }
  }


  getSongsbyAlbumId(){
    let songs = this.selectedAlbum.songs
    if(songs){
      songs.forEach(element => {
        this.songService.getSongsById(element).subscribe(data=>{
          this.songArray.push(data)
          console.log(this.songArray);
        }
        )      
      });
    }
    this.artist = this.songArray[0].artistName
    this.albumImg = this.songArray[0].songImg
  }

}
