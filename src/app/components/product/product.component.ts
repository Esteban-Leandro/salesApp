import { Component, effect, input, signal } from '@angular/core';
import { Product } from '../../app.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CurrencyPipe
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  productSig = input.required<Product>({alias: 'product'})

  counterSig = signal<number>(0);



  addProduct(){
    this.counterSig.update(value => value+1);
  }

  removeProduct(){
    this.counterSig.update(value =>{
      if(value <= 0 )
        return 0;
      return value-1;
    });
  }
}
