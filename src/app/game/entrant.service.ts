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
        const entrant = this.getEntrant();
        this.entrantWaiting.next(entrant);
        return null;
    }

    public getEntrantWaiting(): Observable<InputPapers> {
        return this.entrantWaiting.asObservable();
    }

    private getEntrant(): InputPapers {
        return {
            passport: `ID#: GC07D-FU8AR
                NATION: Arstotzka
                NAME: Guyovich, Russian
                DOB: 1933.11.28
                SEX: M
                ISS: East Grestin
                EXP: 1981.07.10`,
            access_permit: `ID#: GXXXX-FU8AR
                NAME: Guyovich, Russian
                NATION: Arstotzka`
        };
    }
}
