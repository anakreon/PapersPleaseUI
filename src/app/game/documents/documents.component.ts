import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { InputPapers, Papers } from 'papersplease';
import { EntrantService } from '../entrant.service';
import { DRAG_CHANNEL } from '../enums';
import { GameService } from '../game.service';
import { InterpreterService } from '../interpreter.service';

@Component({
    selector: 'app-documents',
    templateUrl: './documents.component.html',
    styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit, AfterViewInit {
    @ViewChild('dropzone') dropzone: ElementRef;

    public isEntrantVisible = false;
    public touched = false;
    public entrantPapers = [];
    private paperDragListeners = {};
    paper = 0;

    constructor(private entrantService: EntrantService, private gameService: GameService, private interpreterService: InterpreterService) {}

    ngOnInit(): void {
        this.entrantService.getEntrantWaiting().subscribe((entrant: InputPapers) => {
            this.isEntrantVisible = true;
            const papers = this.interpreterService.interpret(entrant);
            this.putPapersOnTable(papers);
        });
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
    }

    ngAfterViewInit(): void {
        this.dropzone.nativeElement.addEventListener('drop', this.dropHandler.bind(this));
        this.dropzone.nativeElement.addEventListener('dragover', this.dragoverHandler.bind(this));
    }

    private dropHandler(event): void {
        event.preventDefault();
        const { target, channel } = JSON.parse(event.dataTransfer.getData('text/plain'));
        if (channel === DRAG_CHANNEL.MOVE_PAPER) {
            const paper = {
                id: target,
                ...papersImg[target]
            };
            this.pushToTheMiddle(paper);
        }
    }

    private dragoverHandler(event): void {
        console.log(event.dataTransfer.getData('text/plain'));
        const data = event.dataTransfer.getData('text/plain');
        const { channel } = JSON.parse(data);
        if (channel === DRAG_CHANNEL.MOVE_PAPER) {
            event.preventDefault();
            event.dataTransfer.dropEffect = 'link';
        }
    }

    public onclick(): void {
        this.gameService.deny('asdf');
        //this.isEntrantVisible = !this.isEntrantVisible;
        /*const keys = Object.keys(papers);
        const paper = {
            id: keys[this.paper],
            ...papers[keys[this.paper]]
        };
        this.pushToTheMiddle(paper);
        this.paper++;*/
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
            console.log('registering');
            this.paperDragListeners[id] = true;
            event.target.addEventListener('dragstart', this.documentDragstartHandler.bind(this));
            event.target.addEventListener('dragend', this.documentDragendHandler.bind(this));
        }

        console.log(event.target.id);
    }

    private documentDragstartHandler(event): void {
        console.log('dragging', event.target.id);
        event.dataTransfer.setData('text/plain', JSON.stringify({ channel: DRAG_CHANNEL.INSPECT_PAPER, target: event.target.id }));
    }

    private documentDragendHandler(event): void {
        console.log('dragend');
        const { channel, target } = JSON.parse(event.dataTransfer.getData('text/plain'));
        if (channel === DRAG_CHANNEL.INSPECT_PAPER && event.dataTransfer.dropEffect !== 'none') {
            console.log(channel, event.dataTransfer.dropEffect);
            this.removePaperByKey(target);
            this.paperDragListeners[target] = false;
        }
    }
}

const papersImg = {
    passport: {
        src: '/assets/passport.png',
        width: '90px'
    },
    idcard: {
        src: '/assets/idcard.jpg',
        width: '100px'
    },
    permit: {
        src: '/assets/permit.png',
        width: '80px'
    },
    workpass: {
        src: '/assets/workpass.png',
        width: '110px'
    },
    grant: {
        src: '/assets/grant.png',
        width: '80px'
    },
    certificate: {
        src: '/assets/certificate.png',
        width: '80px'
    },
    authorization: {
        src: '/assets/diplomatic.png',
        width: '50px'
    }
};
