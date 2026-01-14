import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { API_CONSTANTS } from '../../api-constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="flex items-center justify-center min-h-[70vh]">
      <div class="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
        <h2 class="text-3xl font-extrabold text-indigo-700 text-center mb-6">Iniciar Sesión</h2>
        <p class="text-center text-gray-500 mb-8">Bienvenido de vuelta a Mi Tienda Online.</p>

        <form (ngSubmit)="onSubmit()">
          <!-- Campo de Correo Electrónico -->
          <div class="mb-5">
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2"
              >Correo Electrónico</label
            >
            <input
              id="email"
              name="email"
              type="email"
              [ngModel]="email()"
              (ngModelChange)="email.set($event)"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              placeholder="ejemplo@correo.com"
            />
          </div>

          <!-- Campo de Contraseña -->
          <div class="mb-6">
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2"
              >Contraseña</label
            >
            <input
              id="password"
              name="password"
              type="password"
              [ngModel]="password()"
              (ngModelChange)="password.set($event)"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              placeholder="Contraseña"
            />
          </div>

          <!-- Mensaje de Error/Éxito -->
          <p
            data-test="form-message"
            *ngIf="message()"
            class="mb-4 p-3 rounded-lg text-sm font-medium"
            [ngClass]="{
              'bg-red-100 text-red-700 border border-red-300': isError(),
              'bg-green-100 text-green-700 border border-green-300': !isError(),
            }"
          >
            {{ message() }}
          </p>

          <!-- Botón de Login -->
          <button
            type="submit"
            [disabled]="isLoading()"
            class="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-lg text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 disabled:opacity-50"
          >
            <ng-container *ngIf="isLoading()">
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Accediendo...
            </ng-container>
            <ng-container *ngIf="!isLoading()">Iniciar Sesión</ng-container>
          </button>
        </form>

        <!-- Enlace a Registrarse -->
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600">
            ¿No tienes una cuenta?
            <a
              [routerLink]="['/register']"
              class="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
            >
              Regístrate aquí
            </a>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class Login {
  // Variables del formulario usando Signals
  email: WritableSignal<string> = signal('');
  password: WritableSignal<string> = signal('');

  // Estado de la UI usando Signals
  isLoading: WritableSignal<boolean> = signal(false);
  message: WritableSignal<string | null> = signal(null);
  isError: WritableSignal<boolean> = signal(false);

  // Inyección de servicios
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  /**
   * Maneja el envío del formulario de inicio de sesión.
   */
  onSubmit(): void {
    if (!this.email() || !this.password()) {
      this.isError.set(true);
      this.message.set('Por favor, ingresa tu correo y contraseña.');
      return;
    }

    this.isLoading.set(true);
    this.message.set(null);

    // Endpoint de Login en Spring Boot
    const loginUrl = `${API_CONSTANTS.BASE_URL}/api/auth/login`;
    // Nota: Asumo que la ruta es /api/auth/login

    const credentials = {
      email: this.email(),
      password: this.password(),
    };

    // Petición HTTP al backend
    this.http.post(loginUrl, credentials).subscribe({
      next: (response: any) => {
        // Asumo que el backend devuelve un token JWT en 'token' o similar.
        console.log('Login exitoso:', response);

        this.isError.set(false);
        this.message.set('¡Acceso exitoso! Redirigiendo a Productos...');

        // Simulación de guardar el token (esto se mejorará)
        localStorage.setItem('authToken', response.token);

        // Redirigir al usuario a la página de productos
        setTimeout(() => {
          this.router.navigate(['/products']);
        }, 1500);
      },
      error: (error) => {
        console.error('Error al iniciar sesión:', error);
        this.isError.set(true);
        // Mostrar mensaje de error (ej: Credenciales incorrectas)
        const errorMsg = error.error?.message || 'Credenciales incorrectas o error de conexión.';
        this.message.set(`Fallo al iniciar sesión: ${errorMsg}`);
        this.isLoading.set(false);
      },
      complete: () => {
        if (!this.isError()) {
          this.isLoading.set(false);
        }
      },
    });
  }
}
