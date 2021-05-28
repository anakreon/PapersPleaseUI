import { AfterViewChecked, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { EntrantService } from '../entrant.service';

@Component({
    selector: 'app-queue',
    templateUrl: './queue.component.html',
    styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements AfterViewChecked {
    @ViewChild('person') person: ElementRef;
    @ViewChild('last') last: ElementRef;
    @ViewChild('divider') divider: ElementRef;

    private speed = 9;
    private stepNum = 1;
    private personPosition = 150;
    private lastPosition = 150;
    private direction = 1;
    private stepTimeout;
    private dividerPosition = 1;

    constructor(private element: ElementRef, private renderer: Renderer2, private entrantService: EntrantService) {}

    public ngAfterViewChecked(): void {
        if (!this.stepTimeout) {
            this.personPosition = this.person.nativeElement.offsetLeft;
            this.lastPosition = this.last.nativeElement.offsetLeft;
            this.dividerPosition = this.divider.nativeElement.offsetLeft;
        }
    }

    public animate(): void {
        const personNative = this.person.nativeElement;
        this.renderer.setStyle(personNative, 'background-position', -33.5 * this.stepNum + 'px');
        this.personPosition = this.personPosition + this.direction * this.speed;
        if (this.personPosition + 20 > this.dividerPosition) {
            this.entrantService.generateEntrant();
            this.continueAnimate();
            return;
        }
        this.renderer.setStyle(personNative, 'left',  this.personPosition + 'px');
        this.stepNum = (this.stepNum + 1) % 13;
        this.stepTimeout = setTimeout(() => {
            this.animate();
        }, 750 / this.speed);
    }

    private continueAnimate(): void {
        console.log('animating');
        const personNative = this.person.nativeElement;
        this.renderer.setStyle(personNative, 'background-position', -33.5 * this.stepNum + 'px');
        this.personPosition = this.personPosition + this.direction * this.speed;
        if (this.personPosition + 20 > 2 * this.dividerPosition) {
            //this.entrantService.generateEntrant();
            this.renderer.setStyle(personNative, 'left', '420px');
            this.personPosition = this.person.nativeElement.offsetLeft;
            return;
        }
        this.renderer.setStyle(personNative, 'left',  this.personPosition + 'px');
        this.stepNum = (this.stepNum + 1) % 13;
        this.stepTimeout = setTimeout(() => {
            this.continueAnimate();
        }, 750 / this.speed);
    }

    private newAnimate(): void {
        console.log('animating');
        const lastNative = this.last.nativeElement;
        this.renderer.setStyle(lastNative, 'background-position', -33.5 * this.stepNum + 'px');
        this.lastPosition = this.lastPosition + this.direction * this.speed;
        if (this.lastPosition + 20 > this.dividerPosition) {
            //this.entrantService.generateEntrant();
            return;
        }
        this.renderer.setStyle(lastNative, 'left',  this.lastPosition + 'px');
        this.stepNum = (this.stepNum + 1) % 13;
        this.stepTimeout = setTimeout(() => {
            this.newAnimate();
        }, 750 / this.speed);
    }
}
