import { Component, OnInit }    from '@angular/core';
import { ActivatedRoute }       from '@angular/router';
import { Observable }           from 'rxjs';
import { map }                  from 'rxjs/operators';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';


import { Product, Molecule, Group }             from '../../product';
import { DataService }          from '../../data.service';

interface FoodNode {
    name: string;
    children?: FoodNode[];
}

interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    level: number;
}

@Component({
    selector: 'product-detail',
    templateUrl: './product-detail.html',
    styleUrls: ['./product-detail.css']
    })


export class ProductDetail implements OnInit {
  
    product: Product = new Product();
    molecules: Molecule[] = [];
    groups: Group[] = [];
    userCustomSize: string = "";
    price: number = 0;
    group: Product[] = [];

    private _transformer = (node: FoodNode, level: number) => {
        return {
            expandable: !!node.children && node.children.length > 0,
            name: node.name,
            level: level,
        };
    }

    userGuideData: FoodNode[] = [
        {
            name: 'How to get a $25 Sample Kit',
            children: [
                {
                    name: 'Coming soon'
                },
            ]
        }, {
            name: 'Ordering Information',
            children: [
                {
                    name: 'Coming soon',
                }
            ]
        },
    ];

    customSizeChange(p: Product) {
        this.userCustomSize = p.size;
        this.product = p;
        this.price = this.product.cost;
        this.dataService.saveAction('Product Selection', String(this.product.id), '').subscribe(res=>console.log(res));;
    }

    treeControl = new FlatTreeControl<ExampleFlatNode>(
        node => node.level, node => node.expandable);

    treeFlattener = new MatTreeFlattener(
        this._transformer, node => node.level, node => node.expandable, node => node.children);

    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

    getMolecule(id: string) {
        for(let i = 0; i < this.molecules.length; i++) {
            if (id === String(this.molecules[i].id)) {
                return this.molecules[i].name;
            }
        }
        return '';
    }

    getGroup(id: string) {
        for(let i = 0; i < this.groups.length; i++) {
            if (id === String(this.groups[i].id)) {
                return this.groups[i].name;
            }
        }
        return '';
    }

    addToCart() {
        //this.dataService.saveAction('Purchase Intent', 'Add to Cart', '').then(res=>console.log(res));
        this.dataService.saveAction('Purchase Intent', 'Add to Cart', '').subscribe(res=>console.log(res));
        this.dataService.betaJoinModal.emit(true);
    }

    getQuote() {
        //this.dataService.saveAction('Purchase Intent', 'Get a Quote', '').then(res=>console.log(res));
        this.dataService.saveAction('Purchase Intent', 'Get a Quote', '').subscribe(res=>console.log(res));
        this.dataService.betaJoinModal.emit(true);
    }

    saveGuideAction(id: string, flag: boolean) {
        if (!flag) return;
        this.dataService.betaJoinModal.emit(true);
        if(id == 'How to get a $25 Sample Kit') {
            this.dataService.saveAction('Purchase Intent', 'Sample Request', '').subscribe(res=>console.log(res));
        } else {
            this.dataService.saveAction('Purchase Intent', 'Ordering Info', '').subscribe(res=>console.log(res));
        }
    }

    constructor(
        private route: ActivatedRoute, private dataService: DataService
    ) {
        
    }

    ngOnInit() {
        this.product = this.dataService.selectedProduct;

        if( window.location.href.split('/')[4]) {
            console.log(window.location.href.split('/')[4]);
            this.dataService.getProductById(window.location.href.split('/')[4]).then(res => {
                console.log(res);
                this.product = res;
                this.dataService.getProductsByGroup(this.product.group_id).then(res => {
                    this.group = res;
                });
            });
        }

        

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

        this.dataSource.data = this.userGuideData;
        this.userCustomSize = this.product.size;
        this.price = this.product.cost;
    }
}


