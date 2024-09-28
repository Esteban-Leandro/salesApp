import { CurrencyPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CurrencyPipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'salesApp';


  productsSig = signal<Product[]>([
    {
      id:'1',
      name:'Mote con huesillo',
      description:'Vaso de 500 ml de mote con huesillo',
      price: 2000
    },
    {
      id:'2',
      name:'Jugo de huesillo',
      description:'Vaso de 500 ml de jugo de huesillo',
      price: 1500
    },
  ])

  PaymentsMethodsSig = signal<PaymentsMethods[]>([
    {
      id:'1',
      name:'Efectivo',
      icon:'bi-currency-dollar'
    },
    {
      id:'2',
      name:'Transferencia',
      icon:'bi-bank'
    },
    {
      id:'3',
      name:'Tarjeta',
      icon:'bi-credit-card'
    },
  ])
}



export interface Product{
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface PaymentsMethods{
  id: string;
  name: string;
  icon: string;

}
