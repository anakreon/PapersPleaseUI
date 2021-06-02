import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserService } from '../user/user.service';
import { BgmService } from './bgm.service';
import { DayService } from './day.service';
import { GameUserService } from './game-user.service';
import { ScoreService } from './score.service';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    private dailyReportSubject: Subject<void>;
    private continueSubject: Subject<boolean>;

    constructor(
        private gameUserService: GameUserService,
        private dayService: DayService,
        private scoreService: ScoreService,
        private userService: UserService,
        private bgmService: BgmService
    ) {
        this.dailyReportSubject = new Subject<void>();
        this.continueSubject = new Subject<boolean>();
    }

    public isReady(): boolean {
        return this.gameUserService.hasUser();
    }

    public async startGame(): Promise<void> {
        const initialScore = this.gameUserService.getScore();
        this.scoreService.initialize(initialScore);
        try {
            await this.startGameLoop();
            this.saveResults();
        } catch (e) {
            // was negative score = game over
        }
    }

    private async startGameLoop(): Promise<void> {
        await this.startDayWithBgm();
        this.showDailyReport();
        if (this.scoreIsNegative()) {
            return Promise.reject();
        } else {
            const shouldContinue = await this.shouldContinue();
            if (shouldContinue) {
                await this.startGameLoop();
            }
        }
    }

    private async startDayWithBgm(): Promise<void> {
        this.bgmService.play();
        await this.startDay();
        this.bgmService.pause();
    }

    public getDailyReport(): Observable<void> {
        return this.dailyReportSubject.asObservable();
    }

    private showDailyReport(): void {
        this.dailyReportSubject.next();
    }

    private shouldContinue(): Promise<boolean> {
        return new Promise((resolve) => {
            const subscription = this.continueSubject.subscribe((shouldContinue) => {
                subscription.unsubscribe();
                resolve(shouldContinue);
            });
        });
    }

    public continueTheGame(): void {
        this.continueSubject.next(true);
    }

    public endTheGame(): void {
        this.continueSubject.next(false);
    }

    private startDay(): Promise<void> {
        return this.dayService.startDay();
    }

    private scoreIsNegative(): boolean {
        return this.scoreService.getScoreValue() < 0;
    }

    private saveResults(): void {
        const user = this.gameUserService.getUserValue();
        user.score = this.scoreService.getScoreValue();
        this.userService.upsertUser(user);
        this.gameUserService.setUser(null);
    }
}
