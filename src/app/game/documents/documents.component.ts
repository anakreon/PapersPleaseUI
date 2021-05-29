import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { InputPapers } from 'papersplease';
import { EntrantService } from '../entrant.service';

@Component({
    selector: 'app-documents',
    templateUrl: './documents.component.html',
    styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
    @ViewChild('table') table: ElementRef;

    public isEntrantVisible = false;
    public entrantPapers = [];
    private paperDragListeners = {};
    paper = 0;

    constructor(private entrantService: EntrantService) {}

    ngOnInit(): void {
        this.entrantService.getEntrantWaiting().subscribe((entrant: InputPapers) => {
            this.isEntrantVisible = true;
        });
    }

    public onclick(): void {
        //this.isEntrantVisible = !this.isEntrantVisible;
        const keys = Object.keys(papers);
        const paper = {
            id: keys[this.paper],
            ...papers[keys[this.paper]]
        };
        this.pushToTheMiddle(paper);
        this.paper++;
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
        console.log('dragging');
        event.dataTransfer.setData('text/plain', event.target.id);
        event.dataTransfer.dropEffect = 'move';
    }

    private documentDragendHandler(event): void {
        console.log('dragend');
        const data = event.dataTransfer.getData('text/plain');
        if (event.dataTransfer.dropEffect !== 'none') {
            this.removePaperByKey(data);
        }
    }
}

const papers = {
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
