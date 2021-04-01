import { Component, OnInit }    from '@angular/core';
import { Router } from '@angular/router';

import { DataService }          from '../data.service';


@Component({
  selector: 'beta-join',
  templateUrl: './beta-join.html',
  styleUrls: ['./beta-join.css']
})
export class BetaJoin implements OnInit {
  
    modalShow: string = 'hide';
    email: string = '';
    greeting: string = 'Our Kit is still In Development.<br><br><b>Enter your Email to beta test this kit instead of purchasing it.</b>';

    constructor(
        private dataService: DataService, private router: Router
    ) {
        
    }

    hideModal() {
        this.modalShow = 'hide';
    }

    close() {
        this.hideModal();
        this.email = '';
        this.greeting = 'Enter your Email to beta test this kit instead of purchasing it';
    }

    submit() {
        this.dataService.saveAction('Email Submitted', this.email, '').subscribe(res=>{
            console.log(res);
        });
        this.greeting = 'Thank you! We’ll be in touch with you over email.';
    }

    greetingChange() {
        
    }

    ngOnInit() {
        this.dataService.betaJoinModal.subscribe(flag=> {
            this.modalShow = 'show';
        });
    }
}
