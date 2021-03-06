import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import { GameLayoutComponent } from './game-layout/game-layout.component';
import { QueueComponent } from './queue/queue.component';
import { DocumentsComponent } from './documents/documents.component';
import { DetailsModule } from './details/details.module';
import { DayOverDialogComponent } from './day-over-dialog/day-over-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { UserModule } from '../user/user.module';
import { ClockComponent } from './clock/clock.component';

@NgModule({
    declarations: [GameLayoutComponent, QueueComponent, DocumentsComponent, DayOverDialogComponent, ClockComponent],
    imports: [
        CommonModule,
        DetailsModule,
        MatGridListModule,
        MatIconModule,
        MatDialogModule,
        MatButtonModule,
        UserModule
    ]
})
export class GameModule {}
