import { Injectable } from '@angular/core';
import { InputPapers, Papers } from 'papersplease';
import { Observable, Subject } from 'rxjs';
import { ApprovalService } from './approval.service';
import { EntrantService } from './entrant.service';
import { GameUserService } from './game-user.service';
import { ScoreService } from './score.service';

type ApprovalResult = 'approved' | 'denied' | 'detain';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    private fails: number;
    private approvalResult: Subject<ApprovalResult>;

    constructor(
        private gameUserService: GameUserService,
        private entrantService: EntrantService,
        private scoreService: ScoreService,
        private approvalService: ApprovalService
    ) {
        this.fails = 0;
        this.approvalResult = new Subject<ApprovalResult>();
    }

    public isReady(): boolean {
        return this.gameUserService.hasUsername();
    }

    public getApprovalResult(): Observable<ApprovalResult> {
        return this.approvalResult.asObservable();
    }

    public applyEntrant(): void {
        this.entrantService.generateEntrant();
    }

    public getEntrant(): InputPapers {
        const entrant = this.entrantService.generateEntrant();
        return entrant;
    }

    public approve(entrant): void {
        this.approvalResult.next('approved');
        /*if (this.approvalService.shouldAllow(entrant)) {
            this.scoreService.increase();
        } else if (this.approvalService.shouldDeny(entrant)) {
            this.fails += 1;
        } else if (this.approvalService.shouldDetain(entrant)) {
            this.fails += 2;
        } else {
            throw new Error('illegal');
        }*/
    }

    public deny(entrant): void {
        this.approvalResult.next('denied');
        /*
        if (this.approvalService.shouldDeny(entrant)) {
            this.scoreService.increase();
        } else if (this.approvalService.shouldAllow(entrant)) {
            this.fails += 1;
        } else if (this.approvalService.shouldDetain(entrant)) {
            this.fails += 1;
        } else {
            throw new Error('illegal');
        }*/
    }

    public detain(entrant): void {
        if (this.approvalService.shouldDetain(entrant)) {
            this.scoreService.increase();
        } else if (this.approvalService.shouldDeny(entrant)) {
            this.fails += 1;
        } else if (this.approvalService.shouldAllow(entrant)) {
            this.fails += 1;
        } else {
            throw new Error('illegal');
        }
    }
}
