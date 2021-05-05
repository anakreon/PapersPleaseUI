import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map, shareReplay } from 'rxjs/operators';
import { GameUserService } from '../game/game-user.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    private username: string;
    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
        map((result) => result.matches),
        shareReplay()
    );

    constructor(private breakpointObserver: BreakpointObserver, private router: Router, private gameUserService: GameUserService) {
        this.username = '';
        this.gameUserService.getUser().subscribe((username) => {
            this.username = username;
        });
    }

    public getUsername(): string {
        return this.username;
    }

    public logout(): void {
        this.gameUserService.setUser('');
        this.router.navigate(['game']);
    }
}
