import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatTableDataSource } from '@angular/material';

import { Order } from '../../order.model';
import { OrderService } from '../../order.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

orders: Order[];
displayedColumns = ['title', 'bread', 'meat', 'cheese', 'toppings', 'instructions', 'actions'];

  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit() {
   this.fetchOrders();
  }

  fetchOrders() {
    this.orderService
    .getOrders()
    .subscribe((data: Order[]) => {
      this.orders = data;
      console.log('Data requested ...');
      console.log(this.orders);
    });
  }

  editOrder(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteOrder(id) {
    this.orderService.deleteOrder(id).subscribe(() => {
      this.fetchOrders();
    });
  }

}
