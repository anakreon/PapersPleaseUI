import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DayService } from '../day.service';
import { GameService } from '../game.service';
import { ScoreService } from '../score.service';
import { DayOverDialogComponent } from '../day-over-dialog/day-over-dialog.component';
import { Router } from '@angular/router';
import { BgmService } from '../bgm.service';

@Component({
    selector: 'app-game-layout',
    templateUrl: './game-layout.component.html',
    styleUrls: ['./game-layout.component.scss']
})
export class GameLayoutComponent implements OnInit, OnDestroy {
    private subscription: Subscription;

    constructor(
        private scoreService: ScoreService,
        private gameService: GameService,
        private dialog: MatDialog,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.gameService.startGame();
        this.subscription = this.gameService.getDailyReport().subscribe(() => {
            this.openDayEndDialog();
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    private openDayEndDialog(): void {
        const dialogRef = this.dialog.open(DayOverDialogComponent, {
            height: '220px',
            width: '600px'
        });
        dialogRef.disableClose = true;
        const subscription = dialogRef.afterClosed().subscribe(shouldContinue => {
            if (shouldContinue) {
                this.gameService.continueTheGame();
            } else {
                this.gameService.endTheGame();
                this.router.navigate(['dashboard']);
            }
            subscription.unsubscribe();
        });
    }

    public getScore(): Observable<number> {
        return this.scoreService.getScore();
    }
}
