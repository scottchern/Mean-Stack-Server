import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getOrders() {
    return this.http.get(`${this.uri}/orders`);
  }

  getOrderById(id) {
    return this.http.get(`${this.uri}/orders/${id}`);
  }

  addOrder(title, bread, meat, cheese, toppings, instructions) {
    const order = {
      title: title,
      bread: bread,
      meat: meat,
      cheese: cheese,
      toppings: toppings,
      instructions: instructions
    };
    return this.http.post(`${this.uri}/orders/add`, order);
  }

  updateOrder(id, title, bread, meat, cheese, toppings, instructions) {
    const order = {
      title: title,
      bread: bread,
      meat: meat,
      cheese: cheese,
      toppings: toppings,
      instructions: instructions
    };
    return this.http.post(`${this.uri}/orders/update/${id}`, order);
  }

  deleteOrder(id) {
    return this.http.get(`${this.uri}/orders/delete/${id}`);
  }
}
