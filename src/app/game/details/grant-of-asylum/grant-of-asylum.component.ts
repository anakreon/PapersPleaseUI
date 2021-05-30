import { Component, Input, OnInit } from '@angular/core';
import { Papers } from 'papersplease';
import { GrantOfAsylum } from 'papersplease/lib/papers/GrantOfAsylum';

@Component({
    selector: 'app-grant-of-asylum',
    templateUrl: './grant-of-asylum.component.html',
    styleUrls: ['./grant-of-asylum.component.scss']
})
export class GrantOfAsylumComponent implements OnInit {
    @Input() public papers: Papers = null;
    public grant: GrantOfAsylum;

    ngOnInit(): void {
        this.grant = this.papers.getGrantOfAsylum();
    }
}
