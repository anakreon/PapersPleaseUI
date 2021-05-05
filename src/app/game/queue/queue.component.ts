import { AfterViewChecked, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
    selector: 'app-queue',
    templateUrl: './queue.component.html',
    styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements AfterViewChecked {
    @ViewChild('person') person: ElementRef;
    @ViewChild('last') last: ElementRef;
    @ViewChild('divider') divider: ElementRef;

    private speed = 7;
    private stepNum = 1;
    private divPosition = 150;
    private direction = 1;
    private stepTimeout;
    private dividerPosition = 1;

    constructor(private element: ElementRef, private renderer: Renderer2) {}

    public ngAfterViewChecked(): void {
        if (!this.stepTimeout) {
            this.divPosition = this.last.nativeElement.offsetLeft + 30;
            this.dividerPosition = this.divider.nativeElement.offsetLeft;
        }
    }

    public animate(): void {
        const personNative = this.person.nativeElement;
        this.renderer.setStyle(personNative, 'background-position', -33.5 * this.stepNum + 'px');
        this.divPosition = this.divPosition + this.direction * this.speed;
        if (this.divPosition + 20 > this.dividerPosition) {
            return;
        }
        this.renderer.setStyle(personNative, 'left',  this.divPosition + 'px');
        this.stepNum = (this.stepNum + 1) % 13;
        this.stepTimeout = setTimeout(() => {
            this.animate();
        }, 750 / this.speed);
    }
}
