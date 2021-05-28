import { Component, OnInit } from '@angular/core';
import { InputPapers } from 'papersplease';
import { EntrantService } from '../entrant.service';

@Component({
    selector: 'app-documents',
    templateUrl: './documents.component.html',
    styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
    public isEntrantVisible = false;
    public entrantPapers = [];
    paper = 0;

    constructor(private entrantService: EntrantService) {}

    ngOnInit(): void {
        this.entrantService.getEntrantWaiting().subscribe((entrant: InputPapers) => {
            this.isEntrantVisible = true;
        });
    }

    public onclick(): void {
        this.isEntrantVisible = !this.isEntrantVisible;
        /*const keys = Object.keys(papers);
        const paper = papers[keys[this.paper]];
        this.pushToTheMiddle(paper);
        this.paper++;*/
    }

    private pushToTheMiddle(paper): void {
        const middle = this.entrantPapers.length / 2;
        this.entrantPapers.splice(middle, 0, paper);
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
    diplomatic: {
        src: '/assets/diplomatic.png',
        width: '50px'
    }
};