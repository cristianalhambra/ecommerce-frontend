# Running tests & notes for this repository

This file documents how to run the unit tests, coverage collection, and the workarounds used when running tests with Vitest (current approach).

## Run tests locally

- Run Angular CLI tests (default):

```bash
ng test
```

- Run Vitest with coverage (CI-friendly):

```bash
npm run test:ci
```

Vitest will produce `coverage/lcov.info` and a text report in the console. The project enforces a minimum coverage threshold in `vitest.config.ts`.

## Why there are special workarounds in specs

When running the TestBed-based specs with Vitest we encountered two main issues:

1. Resource resolution: Vitest does not resolve external component resources (i.e., `templateUrl` / `styleUrls`) by default in TestBed. To work around this, some specs use `TestBed.overrideComponent()` to inline templates and styles and call `TestBed.resolveComponentResources()`.

2. DI factory (NG0202) errors: For some standalone components, `TestBed.createComponent()` produced `NG0202` errors in Vitest (invalid factory dependency). To make tests stable and fast, we instantiate a component manually in the spec and provide a mocked `HttpClient`/`Router` to TestBed (so we can assert behavior without creating the component via TestBed).

These workarounds are documented in the top of each affected spec (`app.spec.ts`, `login.spec.ts`, `register.spec.ts`, `product-list.spec.ts`). They are intentional and reversible—when upstream compatibility improves we can remove them.

## Notes for maintainers

- Use `npm run format` to apply Prettier formatting.
- Use `npm run typecheck` to run TypeScript checks.
- CI uses `.github/workflows/ci-tests.yml` and uploads `coverage/lcov.info` as an artifact.

If you want help removing the workarounds and re-enabling `createComponent()` for all specs, I can attempt the migration (might require changes in Vitest configuration or test host approach).
