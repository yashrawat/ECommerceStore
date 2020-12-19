import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

const BACKEND_URL = `${environment.apiUrl}/auth`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authStatusListener = new Subject<boolean>();
  private token: string;
  private tokenTimer: any;
  private isAuthenicated = false;
  private userId: string;
  private userData;
  private userDataUpdated = new Subject();
  private paymentMethodValue;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackbar: MatSnackBar,
    private userService: UserService
  ) { }

  openSnackbar(message, action): any {
    this.snackbar.open(message, action, {
      duration: 2000,
    });
  }

  // *********************************
  // saving & getter user data feature
  // *********************************

  getUserData(): any {
    return this.userData;
  }

  getUserDataUpdated(): any {
    return this.userDataUpdated.asObservable();
  }

  getpaymentMethodValue(): any {
    return this.paymentMethodValue;
  }

  // works
  // get userData by ID => name, email, mobile number and address
  getUserById(userId): any {
    this.http.get<{ message: string; userData; }>(`${BACKEND_URL}/getUserData/${userId}`)
      .subscribe(fetchedUserData => {
        this.userData = fetchedUserData.userData;
        this.userDataUpdated.next({ ...this.userData });
      });
  }

  // works
  // save userData by ID => name, email, mobile number and address
  saveUserData(userId, name, email, mobileNumber, address): any {
    let userDataFromAccountInfo;
    userDataFromAccountInfo = {
      name,
      email,
      mobileNumber,
      address
    };
    this.http.put<{ message: string; userData; }>(`${BACKEND_URL}/saveUserData/${userId}`, userDataFromAccountInfo)
      .subscribe(responseData => {
        this.userData = responseData.userData;
        this.userDataUpdated.next({ ...this.userData });
        this.openSnackbar('User Information Updated', 'Updated');
      });
  }

  // pass payment method's value
  confirmOrder(paymentMethod): any {
    this.paymentMethodValue = paymentMethod;
    // TODO: add ordered items in order-history component
    // this.userService.updateExistingUserEssentialsData(this.userId, paymentMethod);
  }

  // ***********************
  // login & signup feature
  // ***********************

  // get token
  getToken(): any {
    return this.token;
  }

  // get isAuth
  getIsAuth(): any {
    return this.isAuthenicated;
  }

  // get userId
  getUserId(): any {
    return this.userId;
  }

  // auth status listener
  getAuthStatusListener(): any {
    return this.authStatusListener.asObservable();
  }

  // works
  // signup
  signup(name: string, email: string, password: string): any {
    this.http.post(BACKEND_URL + '/signup', { name, email, password })
      .subscribe(() => {
        console.log('New user created');
        this.router.navigate(['/auth/login']);
      }, error => {
        console.log(error);
        this.authStatusListener.next(false);
      });
  }

  // works
  // login
  login(email: string, password: string): any {
    this.http.post<{token: string, expiresIn: number, userId: string}>(BACKEND_URL + '/login', { email, password })
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expriesInDuration = response.expiresIn;
          this.setAuthTimer(expriesInDuration);
          this.isAuthenicated = true;
          this.userId = response.userId;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expriesInDuration * 1000);
          this.saveAuthData(token, expirationDate, this.userId);
          this.router.navigate(['/product/products-list']);
        }
      }, error => {
        console.log(error);
        this.authStatusListener.next(false);
      });
  }

  // Auto auth user
  autoAuthUser(): any {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenicated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  // clear auth data
  clearAuthData(): any {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
  }

  // logout
  logout(): any {
    this.token = null;
    this.isAuthenicated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/auth/login']);
  }

  // get auth data
  private getAuthData(): any {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expirationDate');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userId
    };
  }

  // set auth timer
  private setAuthTimer(duration: number): any {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  // Save auth data
  private saveAuthData(token: string, expirationDate: Date, userId: string): any {
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }
}
