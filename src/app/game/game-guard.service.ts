import { Injectable } from '@angular/core';
import { GameService } from './game.service';

@Injectable({
    providedIn: 'root'
})
export class GameGuardService {
    constructor(private gameService: GameService) {}

    public canActivate(): boolean {
        return true;//this.gameService.isReady();
    }
}
