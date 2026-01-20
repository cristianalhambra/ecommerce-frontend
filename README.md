# 🛍️ Ecommerce Frontend (Angular 21)

Frontend moderno desarrollado en **Angular 21** para una aplicación de comercio electrónico.  
Incluye autenticación JWT, guards, servicios centralizados, componentes standalone y una arquitectura limpia y escalable.

## 🚀 Tecnologías principales

- **Angular 21**
- **TypeScript**
- **Standalone Components**
- **Signals (estado reactivo)**
- **Angular Router**
- **Reactive Forms**
- **HTTPClient**
- **CSS modular**

## 📦 Instalación

Clona el repositorio:

``bash
git clone https://github.com/cristianalhambra/ecommerce-frontend.git
cd ecommerce-frontend

Instala dependencias:
bash

npm install

▶️ Ejecutar en desarrollo
bash

ng serve

La aplicación estará disponible en:
Código

http://localhost:4200/

🔐 Autenticación

El frontend se conecta al backend Spring Boot mediante JWT.
Flujo implementado:

  Login con email y contraseña

  Guardado del token en localStorage

  Signals para estado global:

  loggedIn

  userName

  Logout con limpieza de estado

  Interceptor (pendiente de implementar)

   Guards:

  AuthGuard → protege rutas privadas

  AuthRedirectGuard → evita acceder a login/register si ya estás autenticado

🧭 Navbar dinámico

El navbar se actualiza automáticamente según el estado de autenticación:

  Si el usuario no está logueado → muestra Login / Register

  Si el usuario está logueado → muestra nombre + Logout

Implementado como Standalone Component.
🗂️ Estructura del proyecto
Código

src/app/
│
├── guards/
│   ├── auth-guard.ts
│   └── auth-redirect-guard.ts
│
├── services/
│   ├── auth.service.ts
│   └── user.service.ts
│
├── navbar/
│   ├── navbar.ts
│   ├── navbar.html
│   └── navbar.css
│
├── pages/
│   ├── login/
│   ├── register/
│   └── products/
│
└── app.routes.ts

🔗 Conexión con el backend

El backend debe estar corriendo en:
Código

http://localhost:8080

Endpoints usados:

  POST /api/v1/auth/login

  POST /api/v1/auth/register

  GET /api/v1/products (protegido)

Configurable desde user.service.ts.
🧪 Testing

Incluye archivos .spec.ts generados por Angular para pruebas unitarias.

Ejecutar tests:
bash

ng test

📄 Scripts útiles
Comando	Descripción
ng serve	Ejecuta el servidor de desarrollo
ng build	Compila para producción
ng test	Ejecuta pruebas unitarias
ng generate component	Crea un componente
ng generate service	Crea un servicio

👨‍💻 Autor

Cristian Alhambra  
Desarrollador Full‑Stack (Angular + Spring Boot)

📜 Licencia
Proyecto de uso personal y educativo.
