import { NgModule } from '@angular/core';
import { Component, OnInit }    from '@angular/core';
import { ActivatedRoute, Data }       from '@angular/router';
import { Observable }           from 'rxjs';
import { map }                  from 'rxjs/operators';
import { DataService }          from '../data.service';
import { Product, Molecule, Group, Category } from "../product";
import { Router } from '@angular/router';

@Component({
  selector: 'home-search',
  templateUrl: './home-search.html',
  styleUrls: [
    './home-search.css'
  ],
})
export class HomeSearch implements OnInit {
  [x: string]: any;

  categories: Category[] = [];
  //molecules: Molecule[] = [{id: -1, name: ''  }];
  molecules: Molecule[] = [];
  //groups: Group[] = [{id: -1, name: ''}];
  groups: Group[] = [];
  molecule1: string = '-1';
  molecule2: string = '-1';
  group1: string = '-1';
  group2: string = '-1';
  products: Product[] = [];
  
  constructor(
    private route: ActivatedRoute, private dataService: DataService, private router: Router
  ) {
    
  }

  getCategory(n: number) {
    for(let i = 0; i < this.categories.length; i++) {
      if (this.categories[i].id == n) {
        return this.categories[i].name;
      }
    }
    return 0;
  }

  getMolecule(n: number) {
    for(let i = 0; i < this.molecules.length; i++) {
      if(n == 1) {
        if (this.molecules[i].id == Number(this.molecule1)) {
          return this.molecules[i].name;
        }
      } else {
        if (this.molecules[i].id == Number(this.molecule2)) {
          return this.molecules[i].name;
        }
      }
    }
    return "";
  }

  getGroup(n: number) {
    for(let i = 0; i < this.groups.length; i++) {
      if(n == 1) {
        if (this.groups[i].id == Number(this.group1)) {
          return this.groups[i].name;
        }
      } else {
        if (this.groups[i].id == Number(this.group2)) {
          return this.groups[i].name;
        }
      }
    }
    return "";
  }

  saveAction(actionType: number) {

    if (actionType == 1) {
      this.dataService.saveAction('Molecule 1', this.getMolecule(1), this.getMolecule(2)).subscribe(res=>console.log(res));
    }

    if (actionType == 2) {
      this.dataService.saveAction('Molecule 2', this.getMolecule(2), this.getMolecule(1)).subscribe(res=>console.log(res));
    }

    if (actionType == 3) {
      this.dataService.saveAction('Group 1', this.getGroup(1), this.getMolecule(1)).subscribe(res=>console.log(res));
    }
    if (actionType == 4) {
      this.dataService.saveAction('Group 2', this.getGroup(2), this.getMolecule(2)).subscribe(res=>console.log(res));
    }
  }

  searchProduct(actionType: number) {
    
    this.saveAction(actionType);

    this.dataService.getProducts(
      Number(this.molecule1), 
      Number(this.molecule2), 
      Number(this.group1), 
      Number(this.group2)
    ).then(res =>{
      this.products = res;
      console.log(res);
    });
  }

  linkToProductDetail(p: Product) {
    this.dataService.selectedProduct = p;
    this.dataService.saveAction('Product Selection', String(p.id), '').subscribe(res=>console.log(res));
    this.router.navigateByUrl(`/product-detail/${p.id}`);
  }

  linkToBrowse(cat: Category) {
    this.dataService.selectedCategory = cat;
    this.dataService.saveAction('Category Choice', cat.name, '').subscribe(res=>console.log(res));
    this.router.navigateByUrl(`/browse/${cat.id}`);
  }

  ngOnInit() {
    this.dataService.getCategories().then(res=>{
      this.categories = res;
      // while (this.categories.length < 3) {
      //   this.categories.push(new Category());
      // }
    });

    this.dataService.getMolecules().then(res => {
      //this.molecules = res;
      res.map((ele: Molecule)=>{
        this.molecules.push(ele);
      });
    });

    this.dataService.getGroups().then(res=>{
      //this.groups = res;
      res.map((ele: Group)=>{
        this.groups.push(ele);
      });
    });
  }
}
