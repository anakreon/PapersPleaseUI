import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../user/user.types';

@Injectable({
    providedIn: 'root'
})
export class GameUserService {
    private user: BehaviorSubject<User>;

    constructor() {
        this.user = new BehaviorSubject<User>(null);
    }

    public setUser(user: User): void {
        this.user.next(user);
    }

    public getUser(): Observable<User> {
        return this.user.asObservable();
    }

    public hasUser(): boolean {
        return !!this.user.getValue();
    }

    public getScore(): number {
        return this.user.getValue().score;
    }
}
