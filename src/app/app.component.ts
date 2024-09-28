import { CurrencyPipe, NgClass } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ProductComponent } from "./components/product/product.component";
import { v4 as uuidv4 } from 'uuid';

import Swal from 'sweetalert2'
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CurrencyPipe,
    ProductComponent,
    NgClass
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'salesApp';

  router = inject(Router)

  productsSig = signal<Product[]>([
    {
      id: '1',
      name: 'Mote con huesillo',
      description: 'Vaso de 500 ml de mote con huesillo',
      price: 2000
    },
    {
      id: '2',
      name: 'Jugo de huesillo',
      description: 'Vaso de 500 ml de jugo de huesillo',
      price: 1500
    },
  ])

  paymentsMethodsSig = signal<PaymentMethod[]>([
    {
      id: '1',
      name: 'Efectivo',
      icon: 'bi-currency-dollar'
    },
    {
      id: '2',
      name: 'Transferencia',
      icon: 'bi-bank'
    },
    {
      id: '3',
      name: 'Tarjeta',
      icon: 'bi-credit-card'
    },
  ])

  paymentMethodSelectedSig = signal<PaymentMethod>(this.paymentsMethodsSig()[0])

  cartSig = signal<Cart>({
    products: [],
    total: 0,
  })


  saleSig = computed<Sale>(() => {
    const sale: Sale = {
      cart: this.cartSig(),
      date: new Date(),
      paymentMethod: this.paymentMethodSelectedSig(),
      total: this.paymentMethodSelectedSig().id === '3' ? this.cartSig().total + this.cartSig().products.length * 100 : this.cartSig().total
    }
    return sale
  })

  salesSig = signal<Sale[]>([]);

  constructor() {
    const sales = localStorage.getItem('sales') ?? '';
    if (sales)
      this.salesSig.set(JSON.parse(sales))
    effect(() => {
      localStorage.setItem('sales', JSON.stringify(this.salesSig()))
    })
  }


  addProductToCart(product: Product) {
    this.cartSig.update(cart => {

      const newCart = { ...cart }
      let newTotal = 0;

      newCart.products.push(product),


        newCart.products.forEach(product => newTotal += product.price)
      newCart.total = newTotal;

      return newCart

    })
  }

  removeProductToCart(product: Product) {
    this.cartSig.update(cart => {

      const newCart = { ...cart }
      let newTotal = 0;

      const index = newCart.products.findIndex(oldProduct => product.id === oldProduct.id);
      if (index !== -1)
        newCart.products.splice(index, 1)



      newCart.products.forEach(product => newTotal += product.price)
      newCart.total = newTotal;

      return newCart

    })
  }

  selectPaymentMethod(paymentMethod: PaymentMethod) {
    this.paymentMethodSelectedSig.set(paymentMethod)
  }


  initPayment() {
    Swal.fire({
      title: "¿Deseas confirmar el pago?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Pago Exitoso!",
          text: "se ha completado la venta.",
          icon: "success"
        }).then(()=>this.confirmPayment());

      }
    });
  }

  confirmPayment() {
    this.salesSig.update(sales => {
      const newSales = [...sales]

      newSales.push(this.saleSig())
      return newSales;
    })
    this.router.navigate([this.router.url]).then(() => {
      window.location.reload();
    });

  }
}



export interface Product {
  id: string;
  uuid?: string;
  name: string;
  description: string;
  price: number;
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;

}

export interface Cart {

  products: Product[]
  total: number;
}
export interface Sale {
  date: Date,
  cart: Cart
  paymentMethod: PaymentMethod,
  total: number
}
