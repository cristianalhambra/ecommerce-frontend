import { Component, inject } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { CartService } from '../services/cart.service'; 

@Component({ 
  standalone: true, 
  selector: 'app-cart', 
  templateUrl: './cart.html', 
  imports: [CommonModule] 
}) 

export class CartComponent { 
  cart = inject(CartService); 
}
