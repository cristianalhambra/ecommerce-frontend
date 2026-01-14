import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });

    // Instantiate service directly to avoid DI metadata issues in Vitest
    const http = TestBed.inject(HttpClient);
    service = new ProductService(http);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock?.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getProducts should fetch products', () => {
    const mockProducts = [
      { id: 1, name: 'Test Product 1', description: 'Desc', price: 100 },
      { id: 2, name: 'Test Product 2', description: 'Desc', price: 200 },
    ];

    service.getProducts().subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne((service as any).apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('getProducts should propagate HTTP errors', () => {
    service.getProducts().subscribe({
      next: () => {
        throw new Error('expected an error');
      },
      error: (err) => expect(err.status).toBe(500),
    });

    const req = httpMock.expectOne((service as any).apiUrl);
    req.flush({ message: 'Server error' }, { status: 500, statusText: 'Server Error' });
  });
});
