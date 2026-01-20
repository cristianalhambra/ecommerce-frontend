# TiendaFrontend

Este proyecto se generó usando angular 21.0.1

## Servidor de desarrollo

Para iniciar un servidor de desarrollo local, ejecute:

```bash
ng servir
```

Una vez que el servidor se esté ejecutando, abra su navegador y navegue a `http://localhost:4200/`. La aplicación se recargará automáticamente cada vez que modifique alguno de los archivos de origen.

## Andamios de código

La CLI angular incluye potentes herramientas de andamiaje de código. Para generar un nuevo componente, ejecute:

```bash
ng generar componente componente-nombre
```

Para obtener una lista completa de los esquemas disponibles (como `componentes`, `directivas` o `tuberías`), ejecute:

```bash
ng generar --ayuda
```

## Edificio

Para construir el proyecto, ejecute:

```bash
ng construir
```

Esto compilará su proyecto y almacenará los artefactos de compilación en el directorio `dist/`. De forma predeterminada, la compilación de producción optimiza su aplicación para el rendimiento y la velocidad.

## Ejecutando pruebas unitarias

Para ejecutar pruebas unitarias localmente con la CLI angular (por defecto):

```bash
Prueba de ng
```

Para ejecutar la suite de prueba con Vitest y generar un informe de cobertura (CI-friendly):

```bash
npm ejecutar test:ci
```

El script `test:ci` ejecuta Vitest con cobertura y hace cumplir el umbral de cobertura del proyecto (por defecto, 80%).

Este repositorio incluye un flujo de trabajo de GitHub Actions (`.github/workflows/ci-tests.yml`) que ejecuta `npm run test:ci` en push and pull requests to `main` y uploads `coverage/lcov.info` como un artefacto.

## Realizando pruebas de extremo a extremo

Para pruebas de extremo a extremo (e2e), ejecute:

```bash
ng e2e
```

👨‍💻 Autor

Cristian Alhambra  
Desarrollador Full‑Stack (Angular + Spring Boot)

📜 Licencia
Proyecto de uso personal y educativo.
