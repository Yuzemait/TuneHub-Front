import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/shared/services/token.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { LoginService } from 'src/app/shared/services/login.service';
import { Token } from 'src/app/shared/interfaces/token';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  chat: string = "17d0ac7c-83fc-43c0-8a98-b754b585241c"
  loginStatus: boolean = false;

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private socialAuth: SocialAuthService,
    private loginService: LoginService){


    this.tokenService.loginStatus.subscribe((status:boolean) =>{
      this.loginStatus = status;
    });

    this.socialAuth.authState.subscribe((user: SocialUser) => {
      if(user){
        this.loginService.googleLogin(user.idToken).subscribe({
          next: (response: Token) => {
            setTimeout(() => {
              this.tokenService.save(response.token);
              this.router.navigate(['profile']);
            });
          },
          error: () => {
            alert('No se pudo iniciar sesión')
          }
        })
      }
    })
  }

  logout(){
    this.tokenService.remove();
    this.router.navigate([''])
  }


}
