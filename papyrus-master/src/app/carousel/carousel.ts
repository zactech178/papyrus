import { AfterViewInit, Component, ContentChildren, Directive, ElementRef, Input, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { CarouselItemDirective } from '../carousel-item.directive';
import { animate, AnimationBuilder, AnimationFactory, AnimationPlayer, style } from '@angular/animations';

@Directive({
  selector: '.carousel-item'
})
export class CarouselItemElement {
}

@Component({
    selector: 'carousel',
    templateUrl: './carousel.html',
    styleUrls: ['./carousel.css']
})

export class Carousel implements AfterViewInit {
    @ContentChildren(CarouselItemDirective) items : QueryList<CarouselItemDirective> 
                = new QueryList<CarouselItemDirective>();
    @ViewChildren(CarouselItemElement, { read: ElementRef }) private itemsElements : QueryList<ElementRef>
                = new QueryList<ElementRef>();
    @ViewChildren('carousel') private carousel: QueryList<ElementRef> = new QueryList<ElementRef>();
    @Input() timing = '250ms ease-in';
    @Input() showControls = true;
    private player : AnimationPlayer | undefined;
    private itemWidth : number = 0;
    private currentSlide = 0;
    carouselWrapperStyle = {}

    next() {
        if( this.currentSlide + 1 === this.items.length ) return;
        this.currentSlide = (this.currentSlide + 1) % this.items.length;
        const offset = this.currentSlide * this.itemWidth;
        const myAnimation : AnimationFactory = this.buildAnimation(offset);
        console.log(this.carousel);
        this.player = myAnimation.create(this.carousel.first.nativeElement);
        this.player.play();
    }

    private buildAnimation( offset: number ) {
        return this.builder.build([
        animate(this.timing, style({ transform: `translateX(-${offset}px)` }))
        ]);
    }

    prev() {
        if( this.currentSlide === 0 ) return;

        this.currentSlide = ((this.currentSlide - 1) + this.items.length) % this.items.length;
        const offset = this.currentSlide * this.itemWidth;

        const myAnimation : AnimationFactory = this.buildAnimation(offset);
        this.player = myAnimation.create(this.carousel.first.nativeElement);
        this.player.play();
    }

    constructor( private builder : AnimationBuilder ) {
    }

    ngAfterViewInit() {
        // For some reason only here I need to add setTimeout, in my local env it's working without this.
        setTimeout(() => {
        console.log(this.itemsElements);
            //this.itemWidth = this.itemsElements.first.nativeElement.getBoundingClientRect().width;
            this.itemWidth = 300;
            this.carouselWrapperStyle = {
                width: `${this.itemWidth}px`
                
            }
        });
        console.log(this.carousel);
    }

}
