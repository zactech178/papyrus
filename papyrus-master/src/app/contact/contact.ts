import { NgModule } from '@angular/core';
import { Component, OnInit }    from '@angular/core';
import { ActivatedRoute }       from '@angular/router';
import { Observable }           from 'rxjs';
import { map }                  from 'rxjs/operators';
import { Footer }               from '../footer/footer';


@Component({
  selector: 'contact',
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class Contact implements OnInit {
  
  constructor(
    private route: ActivatedRoute
  ) {
    
  }

  ngOnInit() {
    
  }
}
