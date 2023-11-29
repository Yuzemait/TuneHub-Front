import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

import { SocialLoginModule, SocialAuthServiceConfig} from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider
} from '@abacritt/angularx-social-login';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ChatComponent } from './pages/chat/chat.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';


import { MusicPlayerComponent } from './layout/music-player/music-player.component';
import { FormsModule } from '@angular/forms';
import { LoginStatusDirective } from './shared/directives/login-status.directive';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { ArtistComponent } from './pages/artist/artist.component';
import { EventComponent } from './pages/event/event.component';
import { ChatMenuComponent } from './pages/chat-menu/chat-menu.component';
import { EditProfileComponent } from './pages/profile/edit-profile/edit-profile.component';
import { UserInfoComponent } from './pages/profile/user-info/user-info.component';
import { ChangePasswordComponent } from './pages/profile/change-password/change-password.component';
import { ConfirmDialogComponent } from './pages/profile/confirm-dialog/confirm-dialog.component';
import { IsArtistDirective } from './shared/directives/is-artist.directive';
import { ArtistInfoComponent } from './pages/profile/artist-info/artist-info.component';
import { CreateSongComponent } from './pages/profile/create-song/create-song.component';
import { ChatpopupComponent } from './pages/artist/chatpopup/chatpopup.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { CreatePlaylistComponent } from './pages/profile/create-playlist/create-playlist.component';
import { AlbumComponent } from './pages/album/album.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    ChatComponent,
    SignUpComponent,
    MusicPlayerComponent,
    LoginStatusDirective,
    ExploreComponent,
    ArtistComponent,
    LoginStatusDirective,
    AboutUsComponent,
    EventComponent,
    ChatMenuComponent,
    AboutUsComponent,
    EditProfileComponent,
    UserInfoComponent,
    ChangePasswordComponent,
    ConfirmDialogComponent,
    IsArtistDirective,
    ArtistInfoComponent,
    CreateSongComponent,
    ChatpopupComponent,
    CreatePlaylistComponent,
    AlbumComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    SocialLoginModule,
    MatDialogModule,
    MatSnackBarModule

  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            environment.googleClient
          )
        }
      ],
      onError: (err) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
