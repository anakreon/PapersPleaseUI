import { AfterViewChecked, AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { EntrantService } from '../entrant.service';
import { GameService } from '../game.service';

@Component({
    selector: 'app-queue',
    templateUrl: './queue.component.html',
    styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements AfterViewChecked, AfterViewInit {
    @ViewChild('person') person: ElementRef;
    @ViewChild('last') last: ElementRef;
    @ViewChild('divider') divider: ElementRef;
    @ViewChild('queue') queue: ElementRef;

    private speed = 9;
    private stepNum = 1;
    private personPosition = 150;
    private lastPosition = 150;
    private direction = 1;
    private stepTimeout;
    private dividerPosition = 1;
    private queuePosition = 0;
    private people: ElementRef[];

    constructor(private element: ElementRef, private renderer: Renderer2, private gameService: GameService) {}

    public ngAfterViewInit(): void {
        this.people = [this.person, this.last];
    }

    public ngAfterViewChecked(): void {
        if (!this.stepTimeout) {
            this.personPosition = this.person.nativeElement.offsetLeft;
            this.lastPosition = this.last.nativeElement.offsetLeft;
            this.dividerPosition = this.divider.nativeElement.offsetLeft;
            this.queuePosition = this.queue.nativeElement.offsetLeft + this.queue.nativeElement.clientWidth;
        }
    }

    public requestAnotherPerson(): void {
        const person = this.people.shift();
        this.people.push(person);
        const direction = 1;
        const stepNum = 1;
        this.resetPosition(person);
        const personPosition = person.nativeElement.offsetLeft;
        this.walkToBooth(person, personPosition, stepNum, direction);
    }

    private walkToBooth(person: ElementRef, personPosition: number, stepNum: number, direction: number): void {
        const personNative = person.nativeElement;
        this.renderer.setStyle(personNative, 'background-position', -33.5 * stepNum + 'px');
        this.renderer.setStyle(personNative, 'transform', 'scaleX(1)');
        personPosition = personPosition + direction * this.speed;
        if (personPosition + 20 > this.dividerPosition) {
            //arrived at booth
            this.gameService.applyEntrant();
            const subscription = this.gameService.getApprovalResult().subscribe((result) => {
                if (result === 'approved') {
                    this.walkPastBooth(person, personPosition, stepNum, direction);
                } else {
                    this.walkBackFromBooth(person, personPosition, stepNum, -1);
                }
                subscription.unsubscribe();
            });
            /*setTimeout(() => {
                //this.walkPastBooth(person, personPosition, stepNum, direction);
                this.walkBackFromBooth(person, personPosition, stepNum, -1);
            }, 3000);*/
            return;
        }
        this.renderer.setStyle(personNative, 'left',  personPosition + 'px');
        stepNum = (stepNum + 1) % 13;
        const stepTimeout = setTimeout(() => {
            this.walkToBooth(person, personPosition, stepNum, direction);
        }, 750 / this.speed);
    }

    private walkPastBooth(person: ElementRef, personPosition: number, stepNum: number, direction: number): void {
        const personNative = person.nativeElement;
        this.renderer.setStyle(personNative, 'background-position', -33.5 * stepNum + 'px');
        personPosition = personPosition + direction * this.speed;
        if (personPosition + 20 > this.dividerPosition * 2 + 50) {
            //arrived at the end
            return;
        }
        this.renderer.setStyle(personNative, 'left',  personPosition + 'px');
        stepNum = (stepNum + 1) % 13;
        setTimeout(() => {
            this.walkPastBooth(person, personPosition, stepNum, direction);
        }, 750 / this.speed);
    }

    private walkBackFromBooth(person: ElementRef, personPosition: number, stepNum: number, direction: number): void {
        const personNative = person.nativeElement;
        this.renderer.setStyle(personNative, 'background-position', -33.5 * stepNum + 'px');
        this.renderer.setStyle(personNative, 'transform', 'scaleX(-1)');
        personPosition = personPosition + direction * this.speed;
        if (personPosition < -40) {
            //returned back
            return;
        }
        this.renderer.setStyle(personNative, 'left',  personPosition + 'px');
        stepNum = (stepNum + 1) % 13;
        setTimeout(() => {
            this.walkBackFromBooth(person, personPosition, stepNum, direction);
        }, 750 / this.speed);
    }

    private resetPosition(person: ElementRef): void {
        this.renderer.setStyle(person.nativeElement, 'left', this.queuePosition + 'px');
    }
}
