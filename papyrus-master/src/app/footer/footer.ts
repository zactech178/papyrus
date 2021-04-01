import { Component, OnInit }    from '@angular/core';
import { ActivatedRoute }       from '@angular/router';
import { Observable }           from 'rxjs';
import { map }                  from 'rxjs/operators';
import { DataService }          from '../data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'footer',
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class Footer implements OnInit {
  
  constructor(
    private route: ActivatedRoute, private dataService: DataService, private router: Router
  ) {
    
  }

  saveAction() {
    this.dataService.saveAction('Purchase Intent', 'Custom Conjugation', '').subscribe(res=>console.log(res));
    //this.router.navigateByUrl('/contact');
  }

  ngOnInit() {
    
  }
}
