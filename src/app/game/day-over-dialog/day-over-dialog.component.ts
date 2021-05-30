import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../score.service';

@Component({
    selector: 'app-day-over-dialog',
    templateUrl: './day-over-dialog.component.html',
    styleUrls: ['./day-over-dialog.component.scss']
})
export class DayOverDialogComponent implements OnInit {
    constructor(private scoreService: ScoreService) {}

    ngOnInit(): void {}

    public getScore(): number {
        return this.scoreService.getScoreValue();
    }

    public isPositiveScore(): boolean {
        return this.scoreService.getScoreValue() >= 0;
    }
}
