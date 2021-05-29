import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
    selector: 'app-icon-drawer',
    templateUrl: './icon-drawer.component.html',
    styleUrls: ['./icon-drawer.component.scss']
})
export class IconDrawerComponent implements OnInit {
    @Output() onApprove: EventEmitter<void> = new EventEmitter();
    @Output() onDeny: EventEmitter<void> = new EventEmitter();

    public isOpen = false;
    public touched = false;
    public approveStamping = false;
    public denyStamping = false;

    constructor() {}

    ngOnInit(): void {}

    public toggleDrawer(): void {
        this.isOpen = !this.isOpen;
        this.touched = true;
    }

    public approve(): void {
        this.approveStamping = true;
        setTimeout(() => {
            this.approveStamping = false;
            this.onApprove.emit();
        }, 1000);
        console.log('approved');
    }
    public deny(): void {
        this.denyStamping = true;
        setTimeout(() => {
            this.denyStamping = false;
            this.onDeny.emit();
        }, 1000);
        console.log('denied');
    }
}
