import { Component, OnInit }    from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'papyrus';

 

  ngOnInit() {

    // declare global {
    //     interface window { myNamespace: any; }
    // }

    (window as any).mySessionId = String(Math.round(1000000 * Math.random()));
  }
}
