import { Injectable } from '@angular/core';
import { InputPapers, Papers } from 'papersplease';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { InterpreterService } from './interpreter.service';

@Injectable({
    providedIn: 'root'
})
export class EntrantService {
    private entrantWaiting: Subject<InputPapers>;
    constructor(private interpreterService: InterpreterService) {
        this.entrantWaiting = new Subject<InputPapers>();
    }

    public generateEntrant(): InputPapers {
        const entrant = this.getEntrant();
        this.entrantWaiting.next(entrant);
        return entrant;
    }

    public getEntrantWaiting(): Observable<InputPapers> {
        return this.entrantWaiting.asObservable();
    }

    public getInterpretedPapers(): Observable<Papers> {
        return this.entrantWaiting.asObservable().pipe(
            map((inputPapers) => this.interpreterService.interpret(inputPapers))
        );
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
