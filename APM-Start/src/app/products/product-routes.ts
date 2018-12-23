import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductResolverService} from './product-resolver.service';
import { ProductEditInfoComponent } from './product-edit/product-edit-info.component';
import { ProductEditTagsComponent } from './product-edit/product-edit-tags.component';

export const ProductRoutes: Routes = [
  { path: 'products', component: ProductListComponent},
  { path: 'products/:id', component: ProductDetailComponent, resolve: {product: ProductResolverService}},
  { path: 'products/:id/edit', component: ProductEditComponent, resolve: {product: ProductResolverService},
children: [
  { path: '', redirectTo: 'info', pathMatch: 'full'},
  { path: 'info', component: ProductEditInfoComponent},
  { path: 'tags', component: ProductEditTagsComponent}]}
];
