import { Component, OnInit, EventEmitter }    from '@angular/core';
import { ActivatedRoute }       from '@angular/router';
import { Observable }           from 'rxjs';
import { map }                  from 'rxjs/operators';
import {Router} from '@angular/router';

import { DataService }          from '../data.service';
import { Category }             from '../product';



@Component({
  selector: 'main-menu',
  templateUrl: './main-menu.html',
  styleUrls: ['./main-menu.css']
})
export class MainMenu implements OnInit {
  
  ifDropdown = false;
  categories: Category[] = [];
  mobileMenu = 'mobile-menu-list';

  constructor(
    private route: ActivatedRoute, private dataService: DataService, private router: Router
  ) {
    
  }

  showingSubMenu() {
    this.ifDropdown = true;
  }

  hideSubMenu() {
    this.ifDropdown = false;
  }

  toggleSubMenu() {
    this.ifDropdown = !this.ifDropdown;
  }

  linkToSubmenu(cat: Category) {
    
    this.dataService.selectedCategory = cat;
        
    this.dataService.categoryChange.emit(this.dataService.selectedCategory);
    
    this.dataService.saveAction('Category Choice', cat.name, '').subscribe(res=>console.log(res));

    this.menuToggle();
    
    this.router.navigateByUrl(`/browse/${cat.id}`);
  }

  search() {
    let keyword = this.dataService.getKeyword();
    this.dataService.doSearch.emit(keyword);
    this.dataService.saveAction('Search', keyword, '').subscribe(res=>console.log(res));
    this.router.navigateByUrl('/browse');
  }

  changeKeyword(e: Event) {
    
    let ele = <HTMLInputElement>e.target;
    this.dataService.setKeyword(ele.value);
    if ((<KeyboardEvent>e).key == 'Enter') this.search();

  }

  linkToContact(n: number) {
    if (n == 1) this.toggleSubMenu();
    this.dataService.saveAction('Purchase Intent', 'Custom Conjugation', '').subscribe(res=>console.log(res));
    this.router.navigateByUrl('/contact');
  }

  linkToBrowseDesktop(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    console.log('hello');
    //this.dataService.saveAction('Purchase Intent', 'Custom Conjugation', '').then(res=>console.log(res));
    this.router.navigateByUrl('/browse');
  }
  
  linkToBrowseMobile() {
    this.router.navigateByUrl('/browse');
    //this.dataService.saveAction('Purchase Intent', 'Custom Conjugation', '').then(res=>console.log(res));
    this.toggleSubMenu();
  }

  menuToggle() {
    this.mobileMenu = this.mobileMenu == 'mobile-menu-list'? 'mobile-menu-list mobile-menu-list-visible': 'mobile-menu-list';
  }

  ngOnInit() {
    this.dataService.getCategories().then(res=>{
      this.categories = res;
    });
  }
}
