import { Injectable, signal, computed } from '@angular/core'; 
import { Product } from '../models/product'; 

export interface CartItem { 
    product: Product; 
    quantity: number; 
} 

@Injectable({ 
    providedIn: 'root'
 }) 
 export class CartService { 
    
    private items = signal<CartItem[]>([]); 

    //Restaurar carrito desde el almacenamiento local al iniciar el servicio
    constructor() { 
        const saved = localStorage.getItem('cart'); 
        if (saved) { 
            this.items.set(JSON.parse(saved)); 
        }
    }

    // Suscribirse a los cambios en los ítems del carrito para guardar en el almacenamiento local
    private saveCart() { 
        localStorage.setItem('cart', JSON.stringify(this.items())); 
    }

    
    // Computed property para obtener los ítems del carrito
    cartItems = computed(() => this.items());

    // Computed property para obtener el total del carrito
    total = computed(() => 
        this.items().reduce((sum, item) => sum + item.product.price * item.quantity, 0) 
 );
 
 // Nuevo método para contar la cantidad total de ítems en el carrito
    itemCount() { 
        return this.items().reduce((count, item) => count + item.quantity, 0); 
 }
    
 addToCart(product: Product) { 
    const current = this.items(); 
    const existing = current.find(i => i.product.id === product.id); 
    
    if (existing) { 
        existing.quantity++; 
        this.items.set([...current]); 
    } else { 
        this.items.set([...current, { product, quantity: 1 }]); 
    } 

    this.saveCart();
 } 

// Nuevo método para eliminar un ítem del carrito
 removeFromCart(productId: number) { 
    this.items.set(this.items().filter(i => i.product.id !== productId)); 
    this.saveCart();
 } 

 // Nuevo método para limpiar el carrito
 clearCart() { 
    this.items.set([]); 
    this.saveCart();
 } 

 // Nuevo método para aumentar la cantidad de un ítem en el carrito
 increaseQuantity(productId: number) { 
    const current = this.items(); 
    const item = current.find(i => i.product.id === productId); 
    
    if (item) { 
        item.quantity++; 
        this.items.set([...current]);
        this.saveCart(); 
    } 
} 

 // Nuevo método para disminuir la cantidad de un ítem en el carrito
 decreaseQuantity(productId: number) { 
    const current = this.items(); 
    const item = current.find(i => i.product.id === productId); 
    
    if (item) { 
        if (item.quantity > 1) { 
            item.quantity--; 
            this.items.set([...current]); 
        } else { 
            // Si llega a 1 y restas, se elimina del carrito 
            this.removeFromCart(productId);
            return; 
         }
        this.saveCart();
        } 
    } 
}