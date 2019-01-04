import { Component, OnInit } from '@angular/core';

import { AuthService } from './user/auth.service';
import { Router, Event, NavigationStart, RoutesRecognized, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { slideInAnimation } from './app.animation';
import { MessageService } from './messages/message.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent implements OnInit {
  pageTitle = 'Acme Product Management';
  loading = false;

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }
  get toggleMessage(): boolean {
    return this.messageService.displayMessage;
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService) { }
  ngOnInit(): void {
    this.router.events.subscribe( (routerEvent: Event) => {
    this.checkRoterEvent(routerEvent);
    });
  }
  navigateMessage(): void {
    if (this.toggleMessage) {
      this.router.navigate([{outlets: {popup: ['message']}}]);
      this.messageService.displayMessage = false;
    } else {
      this.router.navigate([{outlets: {popup: null}}]);
      this.messageService.displayMessage = true;
      }
  }
  checkRoterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }
    if (
      routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }
  logOut(): void {
    this.authService.logout();
    console.log('Log out');
    // is an obsolute path to remove any relative address
    this.router.navigateByUrl('/welcome');
  }
}
