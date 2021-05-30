import { Component, Input, OnInit } from '@angular/core';
import { Papers } from 'papersplease';
import { AccessPermit } from 'papersplease/lib/papers/AccessPermit';

@Component({
    selector: 'app-access-permit',
    templateUrl: './access-permit.component.html',
    styleUrls: ['./access-permit.component.scss']
})
export class AccessPermitComponent implements OnInit {
    @Input() public papers: Papers = null;
    public permit: AccessPermit;

    constructor() {}

    ngOnInit(): void {
        this.permit = this.papers.getAccessPermit();
    }
}
