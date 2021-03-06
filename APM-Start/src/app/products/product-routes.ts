import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductResolverService} from './product-resolver.service';
import { ProductEditInfoComponent } from './product-edit/product-edit-info.component';
import { ProductEditTagsComponent } from './product-edit/product-edit-tags.component';
import { AuthGuardGuard } from '../user/auth-guard.guard';
import { ProductEditGuard } from './product-edit/product-edit.guard';

export const ProductRoutes: Routes = [
      {
       path: '',
       component: ProductListComponent
      },
      {
        path: ':id',
        component: ProductDetailComponent,
        resolve: {product: ProductResolverService}
      },
      {
        path: ':id/edit', component: ProductEditComponent, resolve: {product: ProductResolverService},
        canDeactivate: [ProductEditGuard],
        children: [
          { path: '', redirectTo: 'info', pathMatch: 'full'},
          { path: 'info', component: ProductEditInfoComponent},
          { path: 'tags', component: ProductEditTagsComponent}
        ]
      }
    ];
