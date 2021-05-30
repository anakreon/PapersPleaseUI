import { Injectable } from '@angular/core';
import { InputPapers, Inspector } from 'papersplease';
import { ApprovalAdapterService } from './approval-adapter.service';
import { BulletinService } from './bulletin.service';
import { APPROVAL_RESULT } from './enums';

@Injectable({
    providedIn: 'root'
})
export class ApprovalService {
    private inspector: Inspector;
    constructor(bulletinService: BulletinService, private approvalAdapterService: ApprovalAdapterService) {
        this.inspector = new Inspector();
        bulletinService.getBulletin().subscribe((bulletin: string) => {
            this.inspector.receiveBulletin(bulletin);
        });
    }

    public validateApproval(entrant: InputPapers): APPROVAL_RESULT {
        if (this.approvalAdapterService.shouldAllow(entrant, this.inspector)) {
            return APPROVAL_RESULT.PASSED;
        } else if (this.approvalAdapterService.shouldDeny(entrant, this.inspector)) {
            return APPROVAL_RESULT.FAILED;
        } else if (this.approvalAdapterService.shouldDetain(entrant, this.inspector)) {
            return APPROVAL_RESULT.FAILED_HARD;
        } else {
            throw new Error('illegal');
        }
    }

    public validateDenial(entrant: InputPapers): APPROVAL_RESULT {
        if (this.approvalAdapterService.shouldDeny(entrant, this.inspector)) {
            return APPROVAL_RESULT.PASSED;
        } else if (this.approvalAdapterService.shouldAllow(entrant, this.inspector)) {
            return APPROVAL_RESULT.FAILED;
        } else if (this.approvalAdapterService.shouldDetain(entrant, this.inspector)) {
            return APPROVAL_RESULT.FAILED;
        } else {
            throw new Error('illegal');
        }
    }

    public validateDetainment(entrant): APPROVAL_RESULT {
        if (this.approvalAdapterService.shouldDetain(entrant, this.inspector)) {
            return APPROVAL_RESULT.PASSED;
        } else if (this.approvalAdapterService.shouldDeny(entrant, this.inspector)) {
            return APPROVAL_RESULT.FAILED;
        } else if (this.approvalAdapterService.shouldAllow(entrant, this.inspector)) {
            return APPROVAL_RESULT.FAILED;
        } else {
            throw new Error('illegal');
        }
    }
}
