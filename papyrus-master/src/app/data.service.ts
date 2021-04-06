import { Injectable, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product, Molecule, Group, Category } from './product';
import { isNgTemplate } from '@angular/compiler';

//import { Http, Response, RequestOptions, Headers } from "@angular/http";

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class DataService {
    //ajaxUrl = "http://localhost:8888/papyrus/ajax.php/";
    ajaxUrl = "https://www.papyrusbio.com/ajax.php/";
    
    options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    molecules = [];
    categories = [];
    groups = [];
    products = [];
    keyword: string = "";

    selectedCategory: Category = new Category();
    selectedProduct: Product = new Product();

    doSearch: EventEmitter<string> = new EventEmitter();
    categoryChange: EventEmitter<Category> = new EventEmitter();
    betaJoinModal: EventEmitter<any> = new EventEmitter();

    getCategories() {
        return fetch(this.ajaxUrl + "?get_categories=1", this.options)
            .then(res=>res.json());
    }

    getMolecules() {
        return fetch(this.ajaxUrl + "?get_molecules=1", this.options)
            .then(res=>res.json());
    }

    getGroups(actionType: number = 0, molecule: string = '', ) {
        return fetch(`${this.ajaxUrl}?get_groups=1&molecule=${molecule}&action_type=${actionType}`, this.options)
            .then(res=>res.json());
    }

    getProducts(m1: number, m2: number, g1: number, g2: number) {
        let item = {
            m1: m1,
            m2: m2,
            g1: g1,
            g2: g2
        };
        return fetch(this.ajaxUrl + "?get_products=1&query=" + JSON.stringify(item), this.options).then(res=>res.json());
    }

    getProductById(id: string) {
        return fetch(this.ajaxUrl + "?get_product_by_id=1&id=" + id, this.options).then(res=>res.json());
    }

    getProductsByKeyword(keyword: string) {
        return fetch(this.ajaxUrl + "?get_products_keyword=1&keyword=" + keyword, this.options).then(res=>res.json());
    }

    getProductsByGroup(groupId: number) {
        return fetch(`${this.ajaxUrl}?get_products_group=1&group_id=${groupId}`, this.options).then(res=>res.json());
    }

    getKeyword() {
        return this.keyword;
    }

    setKeyword(str: string) {
        this.keyword = str;
    } 

    // saveAction(action: string, description: string, related_to: string) {
    //     console.log(related_to);
    //     let index = (window as any).mySessionId;
    //     let saveIndex = Math.floor(Math.random() * 1000);
    //     return fetch(`${this.ajaxUrl}?save_action=${index}&action=${action}&description=${description}&related_to=${related_to}&save_index=${saveIndex}`, this.options).then(res=>res.json());
    // }

    saveAction(action: string, description: string, related_to: string){
        
        let save_action = (window as any).mySessionId;

        let save_index = Math.floor(Math.random() * 1000);

        let data = {save_action, action, description, related_to, save_index}
        console.log(data);
        return this.httpClient.post(`${this.ajaxUrl}`, data);
        //return this.httpClient.post(`${this.ajaxUrl}?save_action=${save_action}&action=${action}&description=${description}&related_to=${related_to}&save_index=${save_index}`, data);
    }

    constructor(private httpClient: HttpClient) { 

    }
}
