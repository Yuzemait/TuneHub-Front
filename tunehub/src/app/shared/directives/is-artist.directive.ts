import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserService } from '../services/user.service';

@Directive({
  selector: '[appIsArtist]'
})
export class IsArtistDirective implements OnInit {

  @Input() appIsArtist: boolean = false;

  constructor(
    private userService: UserService,
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit(): void {
    this.userService.getUserData().subscribe(user => {
      const isArtist = user ? user.artistStatus : false;
      if (isArtist === this.appIsArtist) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
    });
  }
}
