import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ScoreService {
    private score: BehaviorSubject<number>;
    constructor() {
        this.score = new BehaviorSubject(0);
    }

    public getScore(): Observable<number> {
        return this.score.asObservable();
    }
    public increase(): void {
        const change = +10;
        this.updateScore(change);
    }
    public decrease(): void {
        const change = -10;
        this.updateScore(change);
    }

    private updateScore(change: number): void {
        const newValue = this.score.getValue() + change;
        this.score.next(newValue);
    }
}
