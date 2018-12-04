import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material';

import { OrderService } from '../../order.service';
import { Order } from '../../order.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: String;
  order: any = {};
  updateForm: FormGroup;

  constructor(private orderService: OrderService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder) {
    this.createForm();
   }

   createForm() {
    this.updateForm = this.fb.group({
      title: ['', Validators.required],
      bread: '',
      meat: '',
      cheese: '',
      toppings: '',
      instructions: ''
    });
   }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.orderService.getOrderById(this.id).subscribe(res => {
        this.order = res;
        this.updateForm.get('title').setValue(this.order.title);
        this.updateForm.get('bread').setValue(this.order.bread);
        this.updateForm.get('meat').setValue(this.order.meat);
        this.updateForm.get('cheese').setValue(this.order.cheese);
        this.updateForm.get('toppings').setValue(this.order.toppings);
        this.updateForm.get('instructions').setValue(this.order.instructions);
      });
    });
  }

  updateOrder(title, bread, meat, cheese, toppings, instructions) {
    this.orderService.updateOrder(this.id, title, bread, meat, cheese, toppings, instructions).subscribe(() => {
      this.snackBar.open('Order updated successfully', 'OK', {
        duration: 3000
      });
    });
  }

}
