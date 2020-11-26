import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '../user.model';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {

  editAccountInfoDetails: FormGroup;

  // dummy data, delete data and keep variable
  dummyUser: User = {
    userId: 'id',
    name: 'Yash',
    email: 'yash@gmail.com',
    mobileNumber: 9856214735,
    address: 'BTM Layout, Bengaluru, Karnataka, India'
  };

  constructor(private fb: FormBuilder) { }

  onSaveChanges(): void {
    if (this.editAccountInfoDetails.invalid) {
      return;
    }
    this.dummyUser.name = this.editAccountInfoDetails.get('name').value;
    this.dummyUser.email = this.editAccountInfoDetails.get('email').value;
    this.dummyUser.mobileNumber = this.editAccountInfoDetails.get('mobileNumber').value;
    this.dummyUser.address = this.editAccountInfoDetails.get('address').value;
    // this.editAccountInfoDetails.reset();
  }

  ngOnInit(): void {
    this.editAccountInfoDetails = this.fb.group({
      name: [this.dummyUser.name, [Validators.required, Validators.minLength(3)]],
      email: [this.dummyUser.email, [Validators.required, Validators.email]],
      mobileNumber: [this.dummyUser.mobileNumber, [Validators.required]],
      address: [this.dummyUser.address, [Validators.required]]
    });
  }

}
