import { Component, computed, effect, input, OnInit, output, signal, WritableSignal } from '@angular/core';
import { Product } from '../../app.component';
import { CurrencyPipe } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CurrencyPipe
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent{

  productSig = input.required<Product>({alias: 'product'})

  counterSig = signal<number>(0);

  addProductEvent = output<Product>();
  removeProductEvent = output<Product>();

  addProduct(){
    this.counterSig.update(value => value+1);

    this.addProductEvent.emit(this.productSig());
  }

  removeProduct(){
    this.counterSig.update(value =>{
      if(value <= 0 )
        return 0;
      return value-1;
    });


    this.removeProductEvent.emit(this.productSig());

  }
}
