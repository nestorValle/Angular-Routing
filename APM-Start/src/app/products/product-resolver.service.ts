import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProductResolved } from './product';
import { Observable, of } from 'rxjs';
import { ProductService } from './product.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<ProductResolved> {

  constructor(private productService: ProductService) { }
  resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductResolved> {
    const id = router.params['id'];
    if (isNaN(+id)) {
      const message = `product id is not a number: ${id}`;
      return of({product: null, error: message});
    }
    return this.productService.getProduct(+id)
    .pipe(map(product => ({product: product})), catchError(error => {
      const message = `Retrival error: ${error}`;
      return of({product: null, error: message});
    }));
  }
}
