import { Component, OnInit }    from '@angular/core';
import { ActivatedRoute }       from '@angular/router';
import { Observable }           from 'rxjs';
import { map }                  from 'rxjs/operators';
import { Router } from '@angular/router';

import { Category }             from '../product';
import { DataService }          from '../data.service';


@Component({
  selector: 'category-info',
  templateUrl: './category-info.html',
  styleUrls: ['./category-info.css']
})

export class CategoryInfo implements OnInit {
  
  category: Category = new Category();

  linkToBrowse() {
    this.router.navigateByUrl('/browse');
  }

  constructor(
    private route: ActivatedRoute, private dataService: DataService, private router: Router
  ) {
    
  }

  ngOnInit() {
    this.category = this.dataService.selectedCategory;

    this.dataService.categoryChange.subscribe((cat) => {
      this.category = cat;
    });
  }
}
