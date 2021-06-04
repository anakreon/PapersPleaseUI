import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Papers } from 'papersplease';
import { Subscription } from 'rxjs';
import { PassportStatus } from '../details/passport/passport.component';
import { EntrantService } from '../entrant.service';
import { DRAG_CHANNEL } from '../enums';
import { RoundService } from '../round.service';

@Component({
    selector: 'app-documents',
    templateUrl: './documents.component.html',
    styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('dropzone') dropzone: ElementRef;
    private papersInterpretedSubscription: Subscription;
    private approvalDecisionSubscription: Subscription;
    private dragTarget: string;
    public shouldShowBulletin = true;
    public isEntrantVisible = false;
    public touched = false;
    public entrantPapers = [];
    private paperDragListeners = {};
    paper = 0;
    private numberOfPapers = 0;

    constructor(private entrantService: EntrantService, private roundService: RoundService) {}

    ngOnInit(): void {
        this.papersInterpretedSubscription = this.entrantService.getInterpretedPapers().subscribe((papers: Papers) => {
            this.resetLocals();
            this.isEntrantVisible = true;
            this.putPapersOnTable(papers);
        });
        this.approvalDecisionSubscription = this.roundService.getApprovalDecision().subscribe((decision) => {
            this.removePapersFromTable();
            this.isEntrantVisible = false;
        });
    }
    ngOnDestroy(): void {
        this.papersInterpretedSubscription.unsubscribe();
        this.approvalDecisionSubscription.unsubscribe();
    }
    private resetLocals(): void {
        this.touched = false;
        this.paperDragListeners = {};
        this.entrantPapers = [];
    }

    private putPapersOnTable(papers: Papers): void {
        if (papers.getAccessPermit()) {
            this.putPaperOnTable('permit');
        }
        if (papers.getCertificateOfVaccination()) {
            this.putPaperOnTable('certificate');
        }
        if (papers.getDiplomaticAuthorization()) {
            this.putPaperOnTable('authorization');
        }
        if (papers.getGrantOfAsylum()) {
            this.putPaperOnTable('grant');
        }
        if (papers.getIdCard()) {
            this.putPaperOnTable('idcard');
        }
        if (papers.getPassport()) {
            this.putPaperOnTable('passport');
        }
        if (papers.getWorkPass()) {
            this.putPaperOnTable('workpass');
        }
        this.numberOfPapers = this.entrantPapers.length;
    }

    private removePapersFromTable(): void {
        this.entrantPapers = [];
    }

    ngAfterViewInit(): void {
        this.dropzone.nativeElement.addEventListener('drop', this.dropHandler.bind(this));
        this.dropzone.nativeElement.addEventListener('dragover', this.dragoverHandler.bind(this));
    }

    private dropHandler(event): void {
        event.preventDefault();
        const { target, passportStatus } = JSON.parse(event.dataTransfer.getData('text/plain'));
        if (target === 'bulletin') {
            this.shouldShowBulletin = true;
        } else {
            const paper = {
                id: target,
                ...papersImg[target]
            };
            this.pushToTheMiddle(paper);
            this.maybeEndInteraction(passportStatus);
        }
    }

    private dragoverHandler(event): void {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'link';
    }

    private putPaperOnTable(paper: string): void {
        const paperImg = {
            id: paper,
            ...papersImg[paper]
        };
        this.pushToTheMiddle(paperImg);
    }

    private pushToTheMiddle(paper): void {
        const middle = this.entrantPapers.length / 2;
        this.entrantPapers.splice(middle, 0, paper);
    }

    private removePaperByKey(key: string): void {
        const index = this.entrantPapers.findIndex((paper) => paper.id === key);
        this.entrantPapers.splice(index, 1);
    }

    public onImgMouseDown(event): void {
        this.touched = true;
        event.stopPropagation();
        const id = event.target.id;
        if (!this.paperDragListeners[id]) {
            this.paperDragListeners[id] = true;
            event.target.addEventListener('dragstart', this.documentDragstartHandler.bind(this));
            event.target.addEventListener('dragend', this.documentDragendHandler.bind(this));
        }
    }

    private documentDragstartHandler(event): void {
        event.dataTransfer.setData(
            'text/plain',
            JSON.stringify({ channel: DRAG_CHANNEL.INSPECT_PAPER, target: event.target.id })
        );
        event.dataTransfer.effectAllowed = 'move';
        this.dragTarget = event.target.id;
    }

    private documentDragendHandler(event): void {
        if (event.dataTransfer.dropEffect === 'move') {
            if (this.dragTarget === 'bulletin') {
                this.shouldShowBulletin = false;
            } else {
                this.removePaperByKey(this.dragTarget);
                this.paperDragListeners[this.dragTarget] = false;
            }
        }
        this.dragTarget = null;
    }

    private maybeEndInteraction(passportStatus: PassportStatus): void {
        if (this.allDocumentsAreOnTable() && this.madeApprovalDecision(passportStatus)) {
            if (passportStatus === 'Approved') {
                this.roundService.makeApproveDecision();
            } else {
                this.roundService.makeDenyDecision();
            }
        }
    }

    private madeApprovalDecision(passportStatus: PassportStatus): boolean {
        return !!passportStatus;
    }

    private allDocumentsAreOnTable(): boolean {
        return this.entrantPapers.length === this.numberOfPapers;
    }

    public detain(): void {
        this.roundService.makeDetainDecision();
    }
}

const papersImg = {
    passport: {
        src: './assets/passport.png',
        width: '90px'
    },
    idcard: {
        src: './assets/idcard.jpg',
        width: '100px'
    },
    permit: {
        src: './assets/permit.png',
        width: '80px'
    },
    workpass: {
        src: './assets/workpass.png',
        width: '110px'
    },
    grant: {
        src: './assets/grant.png',
        width: '80px'
    },
    certificate: {
        src: './assets/certificate.png',
        width: '80px'
    },
    authorization: {
        src: './assets/diplomatic.png',
        width: '50px'
    }
};
