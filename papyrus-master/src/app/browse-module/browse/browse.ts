import { Component, OnInit }    from '@angular/core';
import { ActivatedRoute }       from '@angular/router';
import { Observable }           from 'rxjs';
import { map }                  from 'rxjs/operators';
import { Router } from '@angular/router';

import { DataService }          from '../../data.service';
import { Product, Molecule, Group, Category } from "../../product";


@Component({
  selector: 'browse',
  templateUrl: './browse.html',
  styleUrls: ['./browse.css']
})
export class Browse implements OnInit {
  
  categories: Category[] = [];
  molecules: Molecule[] = [];
  groups: Group[] = [];
  products: Product[] = [];
  keyword: string = "all";
  filters: boolean[] = [];

  getReactivity(p:Product) {
    let g1 = '', g2 = '', m1 = '', m2 = '';
    for (let i=0; i < this.groups.length; i++) {
      if (this.groups[i].id == Number(p.group1)) g1 =this.groups[i].name;
      if (this.groups[i].id == Number(p.group2)) g2 = this.groups[i].name;
    }
    for (let i=0; i < this.molecules.length; i++) {
      if (this.molecules[i].id == Number(p.molecule1)) m1 = this.molecules[i].name;
      if (this.molecules[i].id == Number(p.molecule2)) m2 = this.molecules[i].name;
    }
    return g1 + " on " + m1 + " with " + g2 + " on " + m2;
  }

  checkFiltered(product: Product) {
    
    if (this.filters[product.category1] || this.filters[product.category2]) {
      return true;
    }
    let i;
    for(i = 0; i < this.categories.length; i++) {
      if (this.filters[this.categories[i].id]) break;
    }
    if (i == this.categories.length) return true;
    return false;
  }

  saveCategoryAction(cat: Category) {
    if (!this.filters[cat.id]) {
      this.dataService.saveAction('Category Choice', cat.name, '').subscribe(res=>console.log(res));
    }
  }

  saveProductAction(p: Product) {
    this.dataService.saveAction('Product Selection', String(p.id), '').subscribe(res=>console.log(res));
  }

  linkToDetail(p: Product) {
    this.dataService.selectedProduct = p;
    this.saveProductAction(p);
    this.router.navigateByUrl(`/product-detail/${p.id}`);
  }

  constructor(
    private route: ActivatedRoute, private dataService: DataService, private router: Router
  ) {
    
  }

  ngOnInit() {

    console.log(window.location.href.split('/')[4]);
    
    if( window.location.href.split('/')[4] ) {
      this.filters[Number(window.location.href.split('/')[4])] = true;
    }

    this.dataService.getCategories().then(res=>{
      this.categories = res;
      this.filters[this.dataService.selectedCategory.id] = true;
      this.dataService.selectedCategory = new Category();
    });

    this.dataService.getMolecules().then(res => {
      this.molecules = res;
    });

    this.dataService.getGroups().then(res=>{
      
      this.groups = res;
    });

    this.keyword = this.dataService.getKeyword();
    if (this.keyword == '') this.keyword = 'all';
    this.dataService.getProductsByKeyword(this.keyword).then(res=>{
      this.products = res;
    });

    this.dataService.doSearch.subscribe((keyword) => {
      this.keyword = this.dataService.getKeyword();
      if (this.keyword == '') this.keyword = 'all';
      this.dataService.getProductsByKeyword(this.keyword).then(res=>{
        this.products = res;
      });
    });

    this.dataService.categoryChange.subscribe((cat) => {
      console.log(cat);
      //this.dataService.selectedCategory = new Category();
      this.filters = [];
      this.filters[cat.id] = true;
      console.log(this.filters);
    });
  }
}
