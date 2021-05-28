import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-icon-drawer',
    templateUrl: './icon-drawer.component.html',
    styleUrls: ['./icon-drawer.component.scss']
})
export class IconDrawerComponent implements OnInit {
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
        }, 1000);
        console.log('approved');
    }
    public deny(): void {
        this.denyStamping = true;
        setTimeout(() => {
            this.denyStamping = false;
        }, 1000);
        console.log('denied');
    }
}
