import { NgModule, Directive } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
//import { SearchProductsModule } from './search-product-module/search-product-module.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatTreeModule } from '@angular/material/tree';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MainMenu } from './main-menu/main-menu';
import { HomeSearch } from './home-search/home-search';
import { Browse } from './browse/browse';
import { CategoryInfo } from './category-info/category-info';
//import { ProductDetail } from './product-detail/product-detail';
import { Carousel, CarouselItemElement } from './carousel/carousel';
import { Footer } from './footer/footer';
import { Contact } from './contact/contact';
import { BetaJoin } from './beta-join/beta-join';

import { CarouselItemDirective } from './carousel-item.directive';
import { BrowseModule } from './browse-module/browse.module';
import { ProductDetailModule } from './product-detail/product-detail.module';

// @Directive({
//   selector: '.carousel-item'
// })

@NgModule({
  declarations: [
    AppComponent,
    MainMenu,
    HomeSearch,
    Browse,
    CategoryInfo,
    //ProductDetail,
    Carousel,
    CarouselItemDirective,
    CarouselItemElement,
    Footer,
    Contact,
    BetaJoin,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //SearchProductsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatTableModule,
    MatTreeModule,
    CdkTreeModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    BrowseModule,
    CommonModule,
    ProductDetailModule,
    HttpClientModule,
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

