import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GameUserService {
    private username: BehaviorSubject<string>;

    constructor() {
        this.username = new BehaviorSubject<string>('');
    }

    public setUser(username: string): void {
        this.username.next(username);
    }

    public getUser(): Observable<string> {
        return this.username.asObservable();
    }

    public hasUsername(): boolean {
        return !!this.username.getValue();
    }
}
