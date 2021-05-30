import { Component, Input, OnInit } from '@angular/core';
import { Papers } from 'papersplease';
import { Passport } from 'papersplease/lib/papers/Passport';

export type PassportStatus = 'Approved' | 'Denied';
@Component({
    selector: 'app-passport',
    templateUrl: './passport.component.html',
    styleUrls: ['./passport.component.scss']
})
export class PassportComponent implements OnInit {
    @Input() public status: PassportStatus = null;
    @Input() public papers: Papers = null;

    public passport: Passport;

    constructor() {}

    ngOnInit(): void {
        this.passport = this.papers.getPassport();
    }

    public isApproved(): boolean {
        return this.status === 'Approved';
    }

    public isDenied(): boolean {
        return this.status === 'Denied';
    }
}
