import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    /*
      Workaround for Vitest:
      - Vitest does not resolve external component resources (templateUrl/styleUrls) automatically.
      - We inline the `App` component's template and styles using TestBed.overrideComponent, then call
        TestBed.resolveComponentResources so TestBed can compile standalone components that reference external files.
      - Keep this in place until TestBed+Vitest resource resolution is improved upstream.
    */
    const fs = await import('fs');
    const path = await import('path');
    TestBed.overrideComponent(App, {
      set: {
        template: fs.readFileSync(path.resolve(process.cwd(), 'src', 'app', 'app.html'), 'utf8'),
        styles: [fs.readFileSync(path.resolve(process.cwd(), 'src', 'app', 'app.css'), 'utf8')],
      },
    });

    // Resolver recursos externos (Vitest no ejecuta resolveComponentResources por defecto)
    await (TestBed as any).resolveComponentResources?.();

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('a')?.textContent || '').toContain('Mi Tienda Online');
  });
});
