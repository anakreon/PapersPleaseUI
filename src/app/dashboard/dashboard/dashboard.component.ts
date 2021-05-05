import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameUserService } from 'src/app/game/game-user.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    constructor(private router: Router, private gameUserService: GameUserService) {}

    ngOnInit(): void {}

    public onUsernameSelected(username: string): void {
        this.gameUserService.setUser(username);
        this.router.navigate(['game']);
    }

    public onUsernameCreated(username: string): void {
        this.gameUserService.setUser(username);
        this.router.navigate(['game']);
    }
}
