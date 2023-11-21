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
      console.log('Social user: ', user);
      if(user){
        this.loginService.googleLogin(user.idToken).subscribe({
          next: (response: Token) => {
            setTimeout(() => {
              this.tokenService.save(response.token);
              this.router.navigate(['profile']);
            });
            console.log('Si se logueo');
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
