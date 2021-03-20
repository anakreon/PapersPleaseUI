import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatGridListModule} from '@angular/material/grid-list'; 

import { GameLayoutComponent } from './game-layout/game-layout.component';

@NgModule({
    declarations: [GameLayoutComponent],
    imports: [CommonModule, MatGridListModule]
})
export class GameModule {}
