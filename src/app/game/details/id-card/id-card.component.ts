import { Component, Input, OnInit } from '@angular/core';
import { Papers } from 'papersplease';
import { IdCard } from 'papersplease/lib/papers/IdCard';

@Component({
    selector: 'app-id-card',
    templateUrl: './id-card.component.html',
    styleUrls: ['./id-card.component.scss']
})
export class IdCardComponent implements OnInit {
    @Input() public papers: Papers = null;
    public idcard: IdCard;

    ngOnInit(): void {
        this.idcard = this.papers.getIdCard();
    }
}
