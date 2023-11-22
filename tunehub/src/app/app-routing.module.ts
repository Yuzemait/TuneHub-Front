import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ChatComponent } from './pages/chat/chat.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { UnauthGuard } from './shared/guards/unauth.guard';
import { AuthGuard } from './shared/guards/auth.guard';
import { AboutUsComponent } from './pages/about-us/about-us.component';

const routes: Routes = [
  {path: '', component: HomeComponent,canActivate: [UnauthGuard]},
  {path: 'about-us', component: AboutUsComponent,canActivate: [UnauthGuard]},
  {path: 'login', component: LoginComponent, canActivate: [UnauthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'chat', component:ChatComponent, canActivate: [AuthGuard]},
  {path: 'sign-up', component:SignUpComponent, canActivate: [UnauthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
