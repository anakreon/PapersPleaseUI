import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { fromEvent, Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    private onlineSubscription: Subscription;
    private offlineSubscription: Subscription;
    private offlineEvent: Observable<Event>;
    private onlineEvent: Observable<Event>;
    private historyPopState: Observable<Event>;
    private historyPopStateSubscription: Subscription;
    private offlineSnackbarRef: MatSnackBarRef<TextOnlySnackBar>;
    public title = 'PapersPleaseUI';

    constructor(private snackBar: MatSnackBar) {}

    ngOnInit(): void {
        this.onlineEvent = fromEvent(window, 'online');
        this.onlineSubscription = this.onlineEvent.subscribe((e) => {
            if (this.offlineSnackbarRef) {
                this.offlineSnackbarRef.dismiss();
                this.offlineSnackbarRef = null;
            }
        });
        this.offlineEvent = fromEvent(window, 'offline');
        this.offlineSubscription = this.offlineEvent.subscribe((e) => {
            this.offlineSnackbarRef = this.snackBar.open('You are offline!');
        });

        this.historyPopState = fromEvent(window, 'popstate');
        this.historyPopStateSubscription = this.historyPopState.subscribe(() => {
            this.snackBar.open('The game state will be lost when using the back button!', 'Close', {
                duration: 3000
            });
        });
    }

    ngOnDestroy(): void {
        this.onlineSubscription.unsubscribe();
        this.offlineSubscription.unsubscribe();
        this.historyPopStateSubscription.unsubscribe();
    }
}
