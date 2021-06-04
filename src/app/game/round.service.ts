import { Injectable, Input } from '@angular/core';
import { InputPapers } from 'papersplease';
import { Observable, Subject } from 'rxjs';
import { ApprovalService, ApprovalResultWithReply } from './approval.service';
import { EntrantService } from './entrant.service';
import { ScoreService } from './score.service';
import { APPROVAL_RESULT } from './enums';

type ApproveDenyDecision = 'approve' | 'deny' | 'detain';
type WalkFinish = 'return' | 'continue' | 'detain';

@Injectable({
    providedIn: 'root'
})
export class RoundService {
    private startWalkSubject: Subject<void>;
    private arrivedAtBoothSubject: Subject<void>;
    private finishWalkSubject: Subject<WalkFinish>;
    private approveDecisionSubject: Subject<ApproveDenyDecision>;
    private inspectorsReply: Subject<string>;
    constructor(
        private entrantService: EntrantService,
        private approvalService: ApprovalService,
        private scoreService: ScoreService
    ) {
        this.startWalkSubject = new Subject<void>();
        this.arrivedAtBoothSubject = new Subject<void>();
        this.finishWalkSubject = new Subject<WalkFinish>();
        this.approveDecisionSubject = new Subject<ApproveDenyDecision>();
        this.inspectorsReply = new Subject<string>();
    }

    public async startRound(): Promise<void> {
        await this.walkFromQueueToBorder();
        const entrant = this.generateEntrant();
        const approvalDecision = await this.getApprovalOrDenial();
        console.log(approvalDecision, 'approvalDecision');
        let approvalResult: ApprovalResultWithReply;
        if (approvalDecision === 'approve') {
            this.continueWalking();
            approvalResult = this.validateApproval(entrant);
        } else if (approvalDecision === 'deny') {
            this.walkBack();
            approvalResult = this.validateDenial(entrant);
        } else {
            this.walkDetain();
            approvalResult = this.validateDetainment(entrant);
        }
        this.replyToEntrant(approvalResult.reply);
        this.updateScore(approvalResult.passed);
    }

    public getWalkerSubscription(): Observable<void> {
        return this.startWalkSubject.asObservable();
    }

    public getWalkFinishSubscription(): Observable<WalkFinish> {
        return this.finishWalkSubject.asObservable();
    }

    public getInspectorsReply(): Observable<string> {
        return this.inspectorsReply.asObservable();
    }

    public arrivedAtBooth(): void {
        this.arrivedAtBoothSubject.next();
    }

    public getArrivedAtBooth(): Observable<void> {
        return this.arrivedAtBoothSubject.asObservable();
    }

    private async walkFromQueueToBorder(): Promise<void> {
        this.startWalkSubject.next();
        return new Promise((resolve) => {
            const subscription = this.arrivedAtBoothSubject.subscribe(() => {
                subscription.unsubscribe();
                resolve();
            });
        });
    }

    private generateEntrant(): InputPapers {
        return this.entrantService.generateEntrant();
    }

    public makeApproveDecision(): void {
        this.approveDecisionSubject.next('approve');
    }

    public makeDenyDecision(): void {
        this.approveDecisionSubject.next('deny');
    }

    public makeDetainDecision(): void {
        this.approveDecisionSubject.next('detain');
    }

    public getApprovalDecision(): Observable<ApproveDenyDecision> {
        return this.approveDecisionSubject.asObservable();
    }

    private async getApprovalOrDenial(): Promise<ApproveDenyDecision> {
        return new Promise((resolve) => {
            const subscription = this.approveDecisionSubject.subscribe((decision: ApproveDenyDecision) => {
                subscription.unsubscribe();
                resolve(decision);
            });
        });
    }

    private continueWalking(): void {
        this.finishWalkSubject.next('continue');
    }

    private walkBack(): void {
        this.finishWalkSubject.next('return');
    }

    private walkDetain(): void {
        this.finishWalkSubject.next('detain');
    }

    private replyToEntrant(reply: string): void {
        this.inspectorsReply.next(reply);
    }

    private validateApproval(entrant: InputPapers): ApprovalResultWithReply {
        return this.approvalService.validateApproval(entrant);
    }

    private validateDenial(entrant: InputPapers): ApprovalResultWithReply {
        return this.approvalService.validateDenial(entrant);
    }

    private validateDetainment(entrant: InputPapers): ApprovalResultWithReply {
        return this.approvalService.validateDetainment(entrant);
    }

    private updateScore(approvalResult: APPROVAL_RESULT): void {
        if (approvalResult === APPROVAL_RESULT.PASSED) {
            this.scoreService.increase();
        } else if (approvalResult === APPROVAL_RESULT.FAILED) {
            this.scoreService.decrease();
        } else if (approvalResult === APPROVAL_RESULT.FAILED_HARD) {
            this.scoreService.decrease();
            this.scoreService.decrease();
        }
    }
}
