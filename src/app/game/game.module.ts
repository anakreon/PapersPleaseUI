import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

import { GameLayoutComponent } from './game-layout/game-layout.component';
import { QueueComponent } from './queue/queue.component';
import { DocumentsComponent } from './documents/documents.component';
import { DetailsModule } from './details/details.module';

@NgModule({
    declarations: [GameLayoutComponent, QueueComponent, DocumentsComponent],
    imports: [CommonModule, DetailsModule, MatGridListModule, MatIconModule]
})
export class GameModule {}
