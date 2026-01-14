import { Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { API_CONSTANTS } from '../../api-constants';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="flex items-center justify-center min-h-[70vh]">
      <div class="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
        <h2 class="text-3xl font-extrabold text-indigo-700 text-center mb-6">Crear una Cuenta</h2>
        <p class="text-center text-gray-500 mb-8">
          Únete a Mi Tienda Online para empezar a comprar.
        </p>

        <form (ngSubmit)="onSubmit()">
          <!-- Campo de Nombre -->
          <div class="mb-5">
            <label for="name" class="block text-sm font-medium text-gray-700 mb-2"
              >Nombre Completo</label
            >
            <input
              id="name"
              name="name"
              type="text"
              [ngModel]="name()"
              (ngModelChange)="name.set($event)"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              placeholder="Ej: Juan Pérez"
            />
          </div>

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
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duración-150"
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
              minlength="6"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              placeholder="Mínimo 6 caracteres"
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

          <!-- Botón de Registro -->
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
              Registrando...
            </ng-container>
            <ng-container *ngIf="!isLoading()">Registrarse</ng-container>
          </button>
        </form>

        <!-- Enlace a Iniciar Sesión -->
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600">
            ¿Ya tienes una cuenta?
            <a
              [routerLink]="['/login']"
              class="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
            >
              Iniciar Sesión
            </a>
          </p>
        </div>
      </div>
    </div>
  `,
  styleUrls: [],
})
export class RegisterComponent {
  name: WritableSignal<string> = signal('');
  email: WritableSignal<string> = signal('');
  password: WritableSignal<string> = signal('');
  message: WritableSignal<string | null> = signal(null);
  isError: WritableSignal<boolean> = signal(false);
  isLoading: WritableSignal<boolean> = signal(false);

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  onSubmit() {
    if (!this.name() || !this.email() || !this.password()) {
      this.message.set('Por favor completa todos los campos');
      this.isError.set(true);
      return;
    }

    this.isLoading.set(true);
    const payload = {
      name: this.name(),
      email: this.email(),
      password: this.password(),
    };

    this.http.post(`${API_CONSTANTS.BASE_URL}/auth/register`, payload).subscribe({
      next: (response: any) => {
        this.message.set('¡Registro exitoso! Redirigiendo...');
        this.isError.set(false);
        this.isLoading.set(false);
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (error: any) => {
        this.message.set(error.error?.message || 'Error al registrar');
        this.isError.set(true);
        this.isLoading.set(false);
      },
    });
  }
}
