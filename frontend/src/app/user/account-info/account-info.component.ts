import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/utils/auth.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit, OnDestroy {

  editAccountInfoDetails: FormGroup;
  userId;
  userInfo;
  userInfoSubs: Subscription;

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  onSaveChanges(): any {
    if (this.editAccountInfoDetails.invalid) {
      return;
    }
    const name = this.editAccountInfoDetails.get('name').value;
    const email = this.editAccountInfoDetails.get('email').value;
    const mobileNumber = this.editAccountInfoDetails.get('mobileNumber').value;
    const address = this.editAccountInfoDetails.get('address').value;
    this.authService.saveUserData(this.userId, name, email, mobileNumber, address);
    // *** modal code ***
    // TODO: fix bootstrap error
    // const myModal = document.getElementsByClassName('modal');
    // myModal.modal.hide();
    // const modal = bootstrap.Modal.getInstance(myModal);
    // modal.hide();
    // this.editAccountInfoDetails.reset();
  }

  ngOnInit(): void {
    // FIX: Error is in ngOnInit
    // 1. User data in card body is updating, but user data in modal form is not updating (modal updates on 2nd visit to
    //    the account-info component)
    this.userId = this.authService.getUserId();
    this.authService.getUserById(this.userId);
    this.userInfo = this.authService.getUserData();
    this.userInfoSubs = this.authService.getUserDataUpdated()
      .subscribe(userData => {
        this.userInfo = userData;

        this.editAccountInfoDetails = this.fb.group({
          name: [this.userInfo?.name, [Validators.required, Validators.minLength(3)]],
          email: [this.userInfo?.email, [Validators.required, Validators.email]],
          mobileNumber: [this.userInfo?.mobileNumber, [Validators.required]],
          address: [this.userInfo?.address, [Validators.required]]
        });
      });

    this.editAccountInfoDetails = this.fb.group({
      name: [this.userInfo?.name, [Validators.required, Validators.minLength(3)]],
      email: [this.userInfo?.email, [Validators.required, Validators.email]],
      mobileNumber: [this.userInfo?.mobileNumber, [Validators.required]],
      address: [this.userInfo?.address, [Validators.required]]
    });
  }

  ngOnDestroy(): void {
    this.userInfoSubs.unsubscribe();
  }

}
