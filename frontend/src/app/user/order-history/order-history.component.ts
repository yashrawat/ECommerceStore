import { Component, OnInit } from '@angular/core';

import { UserService } from '../../utils/user.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  orders;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // this.orders = this.userService.getOrders();
  }

}
