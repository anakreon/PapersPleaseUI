import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BulletinService } from '../../bulletin.service';

@Component({
    selector: 'app-bulletin',
    templateUrl: './bulletin.component.html',
    styleUrls: ['./bulletin.component.scss']
})
export class BulletinComponent implements OnInit {
    @Input() public bulletin: string = null;
    public rows: string[];

    ngOnInit(): void {
        this.rows = this.bulletin.split('\n').map((value) => value.trim());
    }
}
