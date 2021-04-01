import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductDetail }        from './product-detail/product-detail';

const ProductDetailRoutes: Routes = [
  // {
  //   path: 'product-detail',
  //   component: ProductDetail,
  //   children: [
  //     { path: '**', component: ProductDetail },
  //   ]
  // }
  { 
    path: '', 
    component: ProductDetail,
    pathMatch: 'full'
  },
  { 
    path: '**', 
    component: ProductDetail,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(ProductDetailRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProductDetailRouting {}
