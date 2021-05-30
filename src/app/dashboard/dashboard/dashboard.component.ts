import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameUserService } from 'src/app/game/game-user.service';
import { User } from 'src/app/user/user.types';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    constructor(private router: Router, private gameUserService: GameUserService) {}

    ngOnInit(): void {}

    public onUserSelected(user: User): void {
        this.gameUserService.setUser(user);
        this.router.navigate(['game']);
    }

    public onUserCreated(user: User): void {
        this.gameUserService.setUser(user);
        this.router.navigate(['game']);
    }
}
