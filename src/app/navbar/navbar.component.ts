import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { map, shareReplay } from 'rxjs/operators';
import { GameUserService } from '../game/game-user.service';
import { User } from '../user/user.types';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
    private username: string;
    private subscription: Subscription;

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
        map((result) => result.matches),
        shareReplay()
    );

    constructor(private breakpointObserver: BreakpointObserver, private router: Router, private gameUserService: GameUserService) {}

    ngOnInit(): void {
        this.username = '';
        this.subscription = this.gameUserService.getUser().subscribe((user: User) => {
            if (user) {
                this.username = user.name;
            }
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    public getUsername(): string {
        return this.username;
    }

    public logout(): void {
        this.gameUserService.setUser(null);
        this.router.navigate(['game']);
    }
}
