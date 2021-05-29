import { Component, Input, OnInit } from '@angular/core';

export type PassportStatus = 'Approved' | 'Denied';
@Component({
    selector: 'app-passport',
    templateUrl: './passport.component.html',
    styleUrls: ['./passport.component.scss']
})
export class PassportComponent implements OnInit {
    @Input() public status: PassportStatus = null;

    constructor() {}

    ngOnInit(): void {}

    public isApproved(): boolean {
        return this.status === 'Approved';
    }

    public isDenied(): boolean {
        return this.status === 'Denied';
    }
}
