import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { BulletinService } from './bulletin.service';
import { RoundService } from './round.service';

@Injectable({
    providedIn: 'root'
})
export class DayService {
    private timerBaseTime: number;
    private roundTimeLimitMs = 1 * 15 * 1000;
    private roundStartSubject: Subject<void>;
    private roundEndRequestSubject: Subject<void>;
    private roundInProgress: boolean;
    private isTimedOut: boolean;

    constructor(private bulletinService: BulletinService, private roundService: RoundService) {
        this.roundStartSubject = new Subject();
        this.roundEndRequestSubject = new Subject();
    }

    public async startDay(): Promise<void> {
        this.generateNewBulletin();
        this.startTimer();
        await this.startRounds();
        console.log('ending rounds');
        this.printDailyScore();
    }

    private async startRounds(): Promise<void> {
        console.log('starting rounds');
        return new Promise<void>(async (resolve) => {
            const roundSubscription = this.startRound();
            const intervalId = setInterval(() => {
                console.log('checking');
                if (!this.isWithinTimeLimit()) {
                    console.log('timed out');
                    this.isTimedOut = true;
                    if (!this.roundInProgress) {
                        console.log('stopping round');
                        roundSubscription.unsubscribe();
                        clearInterval(intervalId);
                        resolve();
                        /*const roundEndSubscription = this.roundEndRequestSubject.subscribe(() => {
                            roundEndSubscription.unsubscribe();
                            resolve();
                        });*/
                    }
                }
            }, 500);
        });
    }

    public callForRoundStart(): void {
        if (!this.isTimedOut && !this.roundInProgress) {
            this.roundStartSubject.next();
        }
    }

    public callForRoundEnd(): void {
        this.roundEndRequestSubject.next();
    }

    private startRound(): Subscription {
        return this.roundStartSubject.subscribe(async () => {
            this.roundInProgress = true;
            await this.roundService.startRound();
            this.roundInProgress = false;
        });
    }

    private generateNewBulletin(): void {
        this.bulletinService.generateBulletin();
    }

    public getTimerRemainingMs(): number {
        return this.roundTimeLimitMs - (new Date().getTime() - this.timerBaseTime);
    }
    private startTimer(): void {
        this.timerBaseTime = new Date().getTime();
        this.isTimedOut = false;
    }
    private isWithinTimeLimit(): boolean {
        return this.getTimerRemainingMs() > 0;
    }

    private printDailyScore(): void {
        //
    }
}



    /*startDay()
    - generate new bulletin
    - start Timer
    - while timer < limit
        - wait for speaker call //non-blocking
        - startRound()
    - print daily score*/