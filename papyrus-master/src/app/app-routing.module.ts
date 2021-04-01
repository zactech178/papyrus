import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeSearch } from './home-search/home-search';
import { CategoryInfo } from './category-info/category-info';
import { Browse } from './browse/browse';
import { Contact } from './contact/contact';
import { ProductDetailModule } from './product-detail/product-detail.module';

const appRoutes: Routes = [
  // {
  //   path: 'home',
  //   loadChildren: () => import('./search-product-module/search-product-module.module').then(mod => mod.SearchProductsModule)
  // },
  {
    path: 'home',
    component: HomeSearch,
    pathMatch: 'full'
  },
  {
    path: '',
    component: HomeSearch,
    pathMatch: 'full'
  },
  // {
  //   path: 'browse',
  //   component: Browse,
  //   pathMatch: 'full'
  // },
  {
    path: 'browse',
    loadChildren: () => import('./browse-module/browse.module').then(mod => mod.BrowseModule),
  },
  {
    path: 'category',
    component: CategoryInfo,
    pathMatch: 'full'
  },
  {
    path: 'contact',
    component: Contact,
    pathMatch: 'full'
  },
  {
    path: 'product-detail',
    loadChildren: () => import('./product-detail/product-detail.module').then(mod => mod.ProductDetailModule),
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false, // <-- debugging purposes only
      }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
