import { Component, inject, OnInit } from '@angular/core'; 
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common'; 
import { ProductService } from '../services/product.service'; 
import { Product } from '../models/product';

@Component({
     standalone: true,
      selector: 'app-product-edit',
       templateUrl: './product-edit.html', 
       imports: [CommonModule, ReactiveFormsModule, RouterModule] 
    }) 
    export class ProductEditComponent {

        private fb = inject(FormBuilder); 
        private route = inject(ActivatedRoute); 
        private productService = inject(ProductService); 
        router = inject(Router); 
        
        // Formulario NO-NULO → evita todos los errores de null/undefine
        form = this.fb.nonNullable.group({ 
            name: ['', Validators.required], 
            description: ['', Validators.required], 
            price: [0, [Validators.required, Validators.min(0.01)]]
        });
        
        id = Number(this.route.snapshot.paramMap.get('id')); 
        
        ngOnInit() { 
            this.productService.getProduct(this.id).subscribe(product => {
                 this.form.patchValue({
                 name: product.name,
                 description: product.description,
                 price: product.price
                }); 
              });
            } 
            
            onSubmit() { 
                if (this.form.invalid) return; 
                
                // Como el formulario es nonNullable, no hay nulls → TypeScript feliz
                const updatedProduct: Partial<Product> = this.form.value;
                this.productService.updateProduct(this.id, updatedProduct).subscribe(() => { 
                    this.router.navigate(['/products']); 
                }); 
            } 
        }