import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Browse }        from './browse/browse';

const browseRoutes: Routes = [
  // {
  //   path: 'browse',
  //   component: Browse,
  //   children: [
  //     { path: '', component: Browse },
  //     { path: '**', component: Browse },
  //   ]
  // }
  { 
    path: '', 
    component: Browse,
    pathMatch: 'full'
  },
  { 
    path: '**', 
    component: Browse,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(browseRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class BrowseRouting {}
