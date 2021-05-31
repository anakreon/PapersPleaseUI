import { Component, Input, OnInit } from '@angular/core';
import { Nation, Papers } from 'papersplease';
import { DiplomaticAuthorization } from 'papersplease/lib/papers/DiplomaticAuthorization';

@Component({
    selector: 'app-diplomatic-authorization',
    templateUrl: './diplomatic-authorization.component.html',
    styleUrls: ['./diplomatic-authorization.component.scss']
})
export class DiplomaticAuthorizationComponent implements OnInit {
    @Input() public papers: Papers = null;
    public authorization: DiplomaticAuthorization;
    public access: Nation[];

    ngOnInit(): void {
        this.authorization = this.papers.getDiplomaticAuthorization();
        this.access = (<any>this.authorization).access;
    }
}
