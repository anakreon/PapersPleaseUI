import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DayService } from '../day.service';
import { GameService } from '../game.service';
import { ScoreService } from '../score.service';
import { DayOverDialogComponent } from '../day-over-dialog/day-over-dialog.component';

@Component({
    selector: 'app-game-layout',
    templateUrl: './game-layout.component.html',
    styleUrls: ['./game-layout.component.scss']
})
export class GameLayoutComponent implements OnInit {
    constructor(
        private scoreService: ScoreService,
        private gameService: GameService,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.gameService.startGame();
        this.gameService.getDailyReport().subscribe(() => {
            this.openDayEndDialog();
        });
    }

    private openDayEndDialog(): void {
        const dialogRef = this.dialog.open(DayOverDialogComponent, {
            height: '220px',
            width: '600px'
        });
        dialogRef.afterClosed().subscribe(shouldContinue => {
            if (shouldContinue) {
                this.gameService.continueTheGame();
            } else {
                this.gameService.endTheGame();
            }
        });
    }

    public getScore(): Observable<number> {
        return this.scoreService.getScore();
    }
}
