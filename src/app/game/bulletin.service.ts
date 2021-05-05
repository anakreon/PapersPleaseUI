import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BulletinService {
    private bulletin: Subject<string>;
    constructor() {
        this.bulletin = new Subject<string>();
    }

    public generateBulletin(): void {
        const newBulletin = '';
        this.bulletin.next(newBulletin);
    }
    public getBulletin(): Observable<string> {
        return this.bulletin.asObservable();
    }
}
