import { TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../services/product.service';
import { of } from 'rxjs';

// NOTE: ProductList is instantiated manually in tests to avoid createComponent() DI problems under Vitest.
// We inline its template/styles to allow TestBed configuration to work reliably in the Vitest environment.

// Creamos un mock (simulación) del ProductService para aislar las pruebas
class MockProductService {
  getProducts = () =>
    of([
      { id: 1, name: 'Test Product 1', description: 'Test Desc', price: 100 },
      { id: 2, name: 'Test Product 2', description: 'Test Desc', price: 200 },
    ]);
}

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let mockProductService: MockProductService;

  beforeEach(async () => {
    mockProductService = new MockProductService();

    // Inline template/styles for Vitest
    const fs = await import('fs');
    const path = await import('path');
    TestBed.overrideComponent(ProductListComponent, {
      set: {
        template: fs.readFileSync(
          path.resolve(process.cwd(), 'src', 'app', 'product-list', 'product-list.component.html'),
          'utf8',
        ),
        styles: [
          fs.readFileSync(
            path.resolve(process.cwd(), 'src', 'app', 'product-list', 'product-list.css'),
            'utf8',
          ),
        ],
      },
    });

    // Resolver recursos externos (Vitest no ejecuta resolveComponentResources por defecto)
    await (TestBed as any).resolveComponentResources?.();

    // Configuración para Vitest: importar el componente standalone y proveer el mock
    await TestBed.configureTestingModule({
      imports: [ProductListComponent],
      providers: [
        { provide: ProductService, useValue: mockProductService }, // Usar el mock del servicio
      ],
    }).compileComponents();

    // Evitamos crear el componente con TestBed (problemas DI en Vitest) y lo instanciamos manualmente
    component = new ProductListComponent(mockProductService as any);
    // Ejecutar lifecycle manualmente
    component.ngOnInit();
    // No hay template a verificar aquí; verificamos el estado interno
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products from service on init', () => {
    // Verificamos que el array de productos se haya llenado con los datos del mock
    expect(component.products().length).toBe(2);
    expect(component.products()[0].name).toBe('Test Product 1');
  });
});
