import { Component, inject } from '@angular/core'; 
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { Router, RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common'; 
import { ProductService } from '../services/product.service'; 
import { Product } from '../models/product';

@Component({ 
    standalone: true, 
    selector: 'app-product-create', 
    templateUrl: './product-create.html', 
    imports: [CommonModule, ReactiveFormsModule, RouterModule] 
}) 
export class ProductCreateComponent {
     
    private fb = inject(FormBuilder); 
    private productService = inject(ProductService); 
    router = inject(Router);

    form = this.fb.nonNullable.group({ 
        name: ['', Validators.required], 
        description: ['', Validators.required], 
        price: [0, [Validators.required, Validators.min(0.01)]] 
    }); 

        onSubmit() { 
            if (this.form.invalid) return; 

            const newProduct: Partial<Product> = this.form.value;
            
            this.productService.createProduct(newProduct).subscribe(() => { 
                this.router.navigate(['/products']); 
            }); 
        } 
    }