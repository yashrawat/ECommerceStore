import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';

import { AuthService } from '../../utils/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  isLoading = false;
  private authStatusSub: Subscription;

  constructor(private fb: FormBuilder, public authService: AuthService) { }

  onLogin(): any {
    if (this.loginForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value);
    this.loginForm.reset();
  }

  ngOnInit(): any {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(authStatus => {
        // this.authStatusSub = authStatus;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): any {
    this.authStatusSub.unsubscribe();
  }

}
