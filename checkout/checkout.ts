import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { CartService } from "../services/cart.service";

@Component({
    standalone: true,
    selector: 'app-checkout',
    templateUrl: './checkout.html',
    imports: [CommonModule],
})
export class CheckoutComponent {
    cart = inject(CartService);

    confirmOrder() {
        this.cart.clearCart();
        alert('¡Gracias por su compra! Su orden ha sido confirmada.');
    }
}
