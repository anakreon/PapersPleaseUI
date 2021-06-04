import { Injectable } from '@angular/core';
import { InputPapers, Inspector } from 'papersplease';
import { BulletinService } from './bulletin.service';
import { APPROVAL_RESULT } from './enums';

export interface ApprovalResultWithReply {
    passed: APPROVAL_RESULT;
    reply: string;
}

@Injectable({
    providedIn: 'root'
})
export class ApprovalService {
    private inspector: Inspector;
    private approvalReplies = ['Glory to Arstotzka', 'Cause no trouble'];
    private denialReplies = ['Entry denied'];
    private detainmentReplies = ['Detainment'];

    constructor(bulletinService: BulletinService) {
        this.inspector = new Inspector();
        bulletinService.getBulletin().subscribe((bulletin: string) => {
            this.inspector.receiveBulletin(bulletin);
        });
    }

    public validateApproval(entrant: InputPapers): ApprovalResultWithReply {
        const validationResult = this.inspector.inspect(entrant);
        if (this.shouldHaveBeenApproved(validationResult)) {
            return {
                passed: APPROVAL_RESULT.PASSED,
                reply: validationResult
            };
        } else if (this.shouldHaveBeenDenied(validationResult)) {
            return {
                passed: APPROVAL_RESULT.FAILED,
                reply: this.getOneOf(this.approvalReplies)
            };
        } else if (this.shouldHaveBeenDetained(validationResult)) {
            return {
                passed: APPROVAL_RESULT.FAILED_HARD,
                reply: this.getOneOf(this.approvalReplies)
            };
        } else {
            throw new Error('illegal');
        }
    }

    public validateDenial(entrant: InputPapers): ApprovalResultWithReply {
        const validationResult = this.inspector.inspect(entrant);
        if (this.shouldHaveBeenDenied(validationResult)) {
            return {
                passed: APPROVAL_RESULT.PASSED,
                reply: validationResult
            };
        } else if (this.shouldHaveBeenApproved(validationResult)) {
            return {
                passed: APPROVAL_RESULT.FAILED,
                reply: this.getOneOf(this.denialReplies)
            };
        } else if (this.shouldHaveBeenDetained(validationResult)) {
            return {
                passed: APPROVAL_RESULT.FAILED,
                reply: this.getOneOf(this.denialReplies)
            };
        } else {
            throw new Error('illegal');
        }
    }

    public validateDetainment(entrant): ApprovalResultWithReply {
        const validationResult = this.inspector.inspect(entrant);
        if (this.shouldHaveBeenDetained(validationResult)) {
            return {
                passed: APPROVAL_RESULT.PASSED,
                reply: validationResult
            };
        } else if (this.shouldHaveBeenDenied(validationResult)) {
            return {
                passed: APPROVAL_RESULT.FAILED,
                reply: this.getOneOf(this.detainmentReplies)
            };
        } else if (this.shouldHaveBeenApproved(validationResult)) {
            return {
                passed: APPROVAL_RESULT.FAILED,
                reply: this.getOneOf(this.detainmentReplies)
            };
        } else {
            throw new Error('illegal');
        }
    }

    private shouldHaveBeenApproved(validationResult: string): boolean {
        return this.approvalReplies.some((reply: string) => validationResult.includes(reply));
    }
    private shouldHaveBeenDenied(validationResult: string): boolean {
        return this.denialReplies.some((reply: string) => validationResult.includes(reply));
    }
    private shouldHaveBeenDetained(validationResult: string): boolean {
        return this.detainmentReplies.some((reply: string) => validationResult.includes(reply));
    }
    private getOneOf(anArray: string[]): string {
        const randomIndex = Math.floor(Math.random() * anArray.length);
        return anArray[randomIndex];
    }
}
