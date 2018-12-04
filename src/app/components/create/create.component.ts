import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../../order.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(private orderService: OrderService, private fb: FormBuilder, private router:Router) { 
    this.createForm = this.fb.group({
      title: ['', Validators.required],
      bread: '',
      meat: '',
      cheese: '',
      toppings: '',
      instructions: ''
    });
  }

  addOrder(title, bread, meat, cheese, toppings, instructions) {
    this.orderService.addOrder(title, bread, meat, cheese, toppings, instructions).subscribe(() => {
      this.router.navigate(['/list']);
    });
  }

  ngOnInit() {
  }

}
