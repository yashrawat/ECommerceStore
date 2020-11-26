import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../../utils/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private authListenerSubs: Subscription;
  userIsAuthenticated = true;
  userId;

  constructor(private authService: AuthService) { }

  onLogout(): any {
    this.authService.logout();
  }

  ngOnInit(): any {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
    this.userId = this.authService.getUserId();
  }

  ngOnDestroy(): any {
    this.authListenerSubs.unsubscribe();
  }

}
