import { Injectable } from '@angular/core';
import { InputPapers } from 'papersplease';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EntrantService {
    private entrantWaiting: Subject<InputPapers>;
    constructor() {
        this.entrantWaiting = new Subject<InputPapers>();
    }

    public generateEntrant(): InputPapers {
        this.entrantWaiting.next({});
        return null;
    }

    public getEntrantWaiting(): Observable<InputPapers> {
        return this.entrantWaiting.asObservable();
    }
}
