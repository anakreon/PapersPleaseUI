import { AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { DayService } from '../day.service';
import { RoundService } from '../round.service';

@Component({
    selector: 'app-queue',
    templateUrl: './queue.component.html',
    styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements AfterViewChecked, AfterViewInit, OnInit, OnDestroy {
    @ViewChild('person') person: ElementRef;
    @ViewChild('last') last: ElementRef;
    @ViewChild('divider') divider: ElementRef;
    @ViewChild('queue') queue: ElementRef;
    @ViewChild('wrapper') wrapper: ElementRef;
    @ViewChild('refPerson') refPerson: ElementRef;

    private walkerSubscription: Subscription;
    private clockSubscription: Subscription;
    public clockPercentage = 0;
    private moveSpeed = 9;
    private dividerPosition = 1;
    private people: ElementRef[];

    constructor(private renderer: Renderer2, private dayService: DayService, private roundService: RoundService) {}

    @HostListener('window:resize', ['$event'])
    public onResize(event): void {
        this.initializePersonPosition();
    }

    ngOnInit(): void {
        this.walkerSubscription = this.roundService.getWalkerSubscription().subscribe(() => {
            this.requestAnotherPerson();
        });
        this.clockSubscription = this.dayService.getTimerRemainingPctObservable().subscribe((remainingPct: number) => {
            this.clockPercentage = 100 - remainingPct;
        });
    }

    ngOnDestroy(): void {
        this.walkerSubscription.unsubscribe();
        this.clockSubscription.unsubscribe();
    }

    public ngAfterViewInit(): void {
        this.people = [this.person, this.last];
        this.initializePersonPosition();
    }

    private initializePersonPosition(): void {
        this.renderer.setStyle(this.person.nativeElement, 'left', this.last.nativeElement.offsetLeft + 30 + 'px');
    }

    public ngAfterViewChecked(): void {
        this.dividerPosition = this.wrapper.nativeElement.clientWidth / 2;
    }

    public callForRoundStart(): void {
        this.dayService.callForRoundStart();
    }

    private requestAnotherPerson(): void {
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
        personPosition = personPosition + direction * this.moveSpeed;
        if (personPosition + 20 > this.dividerPosition) {
            this.roundService.arrivedAtBooth();
            const subscription = this.roundService.getWalkFinishSubscription().subscribe((result) => {
                if (result === 'continue') {
                    this.walkPastBooth(person, personPosition, stepNum, direction);
                } else if (result === 'return') {
                    this.walkBackFromBooth(person, personPosition, stepNum, -1);
                } else {
                    this.walkDownToBooth(person, person.nativeElement.offsetTop, stepNum, direction);
                }
                subscription.unsubscribe();
            });
            return;
        }
        this.renderer.setStyle(personNative, 'left', personPosition + 'px');
        stepNum = (stepNum + 1) % 13;
        setTimeout(() => {
            this.walkToBooth(person, personPosition, stepNum, direction);
        }, 750 / this.moveSpeed);
    }

    private walkPastBooth(person: ElementRef, personPosition: number, stepNum: number, direction: number): void {
        const personNative = person.nativeElement;
        this.renderer.setStyle(personNative, 'background-position', -33.5 * stepNum + 'px');
        personPosition = personPosition + direction * this.moveSpeed;
        if (personPosition + 20 > this.dividerPosition * 2 + 50) {
            this.dayService.callForRoundEnd();
            return;
        }
        this.renderer.setStyle(personNative, 'left', personPosition + 'px');
        stepNum = (stepNum + 1) % 13;
        setTimeout(() => {
            this.walkPastBooth(person, personPosition, stepNum, direction);
        }, 750 / this.moveSpeed);
    }

    private walkBackFromBooth(person: ElementRef, personPosition: number, stepNum: number, direction: number): void {
        const personNative = person.nativeElement;
        this.renderer.setStyle(personNative, 'background-position', -33.5 * stepNum + 'px');
        this.renderer.setStyle(personNative, 'transform', 'scaleX(-1)');
        personPosition = personPosition + direction * this.moveSpeed;
        if (personPosition < -40) {
            this.dayService.callForRoundEnd();
            return;
        }
        this.renderer.setStyle(personNative, 'left', personPosition + 'px');
        stepNum = (stepNum + 1) % 13;
        setTimeout(() => {
            this.walkBackFromBooth(person, personPosition, stepNum, direction);
        }, 750 / this.moveSpeed);
    }

    private walkDownToBooth(person: ElementRef, personPosition: number, stepNum: number, direction: number): void {
        const personNative = person.nativeElement;
        this.renderer.setStyle(personNative, 'background-position', -33.5 * stepNum + 'px');
        personPosition = personPosition + direction * this.moveSpeed;
        const personHeight = 60;
        if (personPosition > this.wrapper.nativeElement.clientHeight - 60) {
            this.dayService.callForRoundEnd();
            return;
        }
        this.renderer.setStyle(personNative, 'top', personPosition + 'px');
        stepNum = (stepNum + 1) % 13;
        setTimeout(() => {
            this.walkDownToBooth(person, personPosition, stepNum, direction);
        }, 750 / this.moveSpeed);
    }

    private resetPosition(person: ElementRef): void {
        this.renderer.setStyle(person.nativeElement, 'left', this.refPerson.nativeElement.offsetLeft + 30 + 'px');
        this.renderer.setStyle(person.nativeElement, 'top', this.refPerson.nativeElement.offsetTop + 'px');
    }
}
