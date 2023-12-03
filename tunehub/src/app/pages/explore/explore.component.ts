import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ArtistService } from '../../shared/services/artist.service';
import { AlbumsService } from 'src/app/shared/services/albums.service';
import { SongService } from 'src/app/shared/services/song.service';
import { formatDate } from '@angular/common';
import { UserService } from 'src/app/shared/services/user.service';
import { PlaylistService } from 'src/app/shared/services/playlist.service';
import { User } from 'src/app/shared/interfaces/user';
import { Playlist } from 'src/app/shared/interfaces/playlist';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent {
  @ViewChild('artistsPaginator') artistsPaginator!: MatPaginator;
  @ViewChild('albumsPaginator') albumsPaginator!: MatPaginator;
  @ViewChild('songsPaginator') songsPaginator!: MatPaginator;
  artists: any[] = [];
  filteredArtists: any[] = [];
  albums: any[] = [];
  filteredAlbums: any[] = [];
  songs: any[] = [];
  filteredSongs: any[] = [];
  searchQuery: string = '';
  user: User = { id: '', username: '', email: '', password: '', artistStatus: false, address: '', imgId: 'default.png', ownChat: "", playlists: [] }
  playlists: Playlist[] = [];
  pageSize = 5; 
  currentPage = 0;
  currentTab: number = 0;

  constructor(private artistService: ArtistService,
    private albumService: AlbumsService,
    private songService: SongService,
    private userService: UserService,
    private playlistService: PlaylistService,
    private snackBar: MatSnackBar, ) { }

  ngOnInit(): void {
    this.artistService.getAllArtists().subscribe(
      data => {
        this.artists = data;
        this.filteredArtists = data;
      },
      error => {
        console.log(error);
      }
    );
    this.albumService.getAllAlbums().subscribe(
      data => {
        this.albums = data;
        this.filteredAlbums = data;
      },
      error => {
        console.log(error);
      }
    );

    this.songService.getSongs().subscribe(
      data => {
        this.songs = data;
        this.filteredSongs = data;
      },
      error => {
        console.log(error);
      }
    );

    this.loadUserData();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000, 
      verticalPosition: 'top'
    });
  }

  getPaginatedItems(items: any[]): any[] {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return items.slice(startIndex, endIndex);
  }
  
  changePage(event: any): void {
    this.currentPage = event.pageIndex;
  }

  switchTab(index: number): void {
    if (this.currentTab !== index) {
      this.currentPage = 0;
  
      switch (this.currentTab) {
        case 0: 
        this.songsPaginator.pageIndex = 0;   
          break;
        case 1:
          this.artistsPaginator.pageIndex = 0;
          break;
        case 2: 
          this.albumsPaginator.pageIndex = 0;
          break;

      }
    }
    this.currentTab = index;
  }
  

  filterAlbums() {
    if (this.searchQuery) {
      this.filteredAlbums = this.albums.filter(album => {
        return album.title.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    } else {
      this.filteredAlbums = this.albums;
    }
  }

  filterArtists() {
    if (this.searchQuery) {
      this.filteredArtists = this.artists.filter(artist => {
        return artist.username.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    } else {
      this.filteredArtists = this.artists;
    }
  }

  filterSongs() {
    if (this.searchQuery) {
      this.filteredSongs = this.songs.filter(song => {
        return song.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    } else {
      this.filteredSongs = this.songs;
    }
  }

  formatDate(date: Date): string {
    return formatDate(date, 'MMMM d, y', 'en-US');
  }

  addToPlaylist(playlistId: string, newSong: string): void {
    const updateData = { songs: newSong };

    this.playlistService.updatePlaylist(playlistId, updateData)
      .subscribe(
        (playlistActualizada) => {
          console.log('Playlist actualizada:', playlistActualizada);
          this.openSnackBar('Song added to your playlist', 'Ok');
        },
        (error) => {
          console.error('Error al actualizar la playlist:', error);
        }
      );
  }

  loadUserData() {
    this.userService.getUserData().subscribe(
      (data) => {
        this.user = data;
        this.userService.setUser(this.user);

        if (this.user.playlists) {
          this.playlists = []; // Limpia la lista de reproducción antes de volver a cargar
          for (const playlistId of this.user.playlists) {
            this.playlistService.getPlaylist(playlistId).subscribe(
              (playlist: Playlist) => {
                this.playlists.push(playlist);
              },
              (error) => {
                console.error('Error getting playlist:', error);
              }
            );
          }
        }
      },
      (error) => {
        console.error('Error al obtener datos del usuario:', error);
      }
    );
  }
}
