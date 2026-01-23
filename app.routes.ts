import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { RegisterComponent } from './auth/register/register';
import { AuthGuard } from './guards/auth-guard';
import { authRedirectGuard } from './guards/auth-redirect-guard';
import { LoginComponent } from './auth/login/login';


export const routes: Routes = [

  //RUTA EXPLÍCITA para /products (Asegura que el enlace del Navbar funcione)
  { path: 'products', 
    component: ProductListComponent, 
    title: 'Lista de Productos',
    canActivate: [AuthGuard] 
  },

  //Rutas de creación y edición de productos
  { path: 'products/create', 
    loadComponent: () => 
      import('./product-create/product-create').then(m => m.ProductCreateComponent), 
    canActivate: [AuthGuard], 
    title: 'Crear Producto' 
  }, 

  { 
    path: 'products/edit/:id',
     loadComponent: () => 
      import('./product-edit/product-edit').then(m => m.ProductEditComponent), 
     canActivate: [AuthGuard], 
     title: 'Editar Producto' 
    },

  // Ruta por defecto: REDIRIGE a /products.
  { path: '', 
    redirectTo: 'products', 
    pathMatch: 'full' },

  //Ruta para registrar un nuevo usuario
  { path: 'register', 
    component: RegisterComponent,
    canActivate: [authRedirectGuard], 
    title: 'Registro de Usuario' },

  //Ruta para iniciar sesión
  { path: 'login', 
    component: LoginComponent, 
    canActivate: [authRedirectGuard],
    title: 'Iniciar Sesión' },


  //Ruta para el carrito de compras (Standalone Component)
  { path: 'cart',
    loadComponent: () => import('./cart/cart').then(m => {
        console.log('Contenido de m:', m);
        return m.CartComponent;
    }),
    title: 'Carrito de Compras'
  },

  //Ruta para checkout (Standalone Component)
  { path: 'checkout',
     loadComponent: () => 
      import('./checkout/checkout').then(m => m.CheckoutComponent), 
     canActivate: [AuthGuard], 
     title: 'Finalizar Compra' 
    },

  //Ruta para cualquier otra URL no definida
  { 
    path: '**', 
    redirectTo: '', 
    pathMatch: 'full' 
  },

];
