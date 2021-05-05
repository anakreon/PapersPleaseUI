import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ScoreService } from '../score.service';

@Component({
    selector: 'app-game-layout',
    templateUrl: './game-layout.component.html',
    styleUrls: ['./game-layout.component.scss']
})
export class GameLayoutComponent implements OnInit {
    constructor(private scoreService: ScoreService) {}

    ngOnInit(): void {}

    public getScore(): Observable<number> {
        return this.scoreService.getScore();
    }
}
