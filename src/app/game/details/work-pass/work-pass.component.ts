import { Component, Input, OnInit } from '@angular/core';
import { Papers } from 'papersplease';
import { PersonalData } from 'papersplease/lib/papers/PersonalData';

@Component({
    selector: 'app-work-pass',
    templateUrl: './work-pass.component.html',
    styleUrls: ['./work-pass.component.scss']
})
export class WorkPassComponent implements OnInit {
    @Input() public papers: Papers = null;
    public data: PersonalData;

    ngOnInit(): void {
        this.data = this.papers.getPersonalData();
    }
}
