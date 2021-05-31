import { Injectable } from '@angular/core';
import { InputPapers, Papers } from 'papersplease';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { BulletinService } from './bulletin.service';
import { InterpreterService } from './interpreter.service';
import { PaperGeneratorService } from './paper-generator.service';

@Injectable({
    providedIn: 'root'
})
export class EntrantService {
    private bulletin: string;
    private entrantWaiting: Subject<InputPapers>;
    constructor(
        private interpreterService: InterpreterService,
        private paperGeneratorService: PaperGeneratorService,
        bulletinService: BulletinService
    ) {
        this.entrantWaiting = new Subject<InputPapers>();
        bulletinService.getBulletin().subscribe((bulletin: string) => {
            this.bulletin = bulletin;
        });
    }

    public generateEntrant(): InputPapers {
        const entrant = this.getEntrant();
        console.log('e', entrant);
        this.entrantWaiting.next(entrant);
        return entrant;
    }

    public getEntrantWaiting(): Observable<InputPapers> {
        return this.entrantWaiting.asObservable();
    }

    public getInterpretedPapers(): Observable<Papers> {
        return this.entrantWaiting
            .asObservable()
            .pipe(map((inputPapers) => this.interpreterService.interpret(inputPapers)));
    }

    private getEntrant(): InputPapers {
        return this.paperGeneratorService.generatePapers(this.bulletin);
    }
}
