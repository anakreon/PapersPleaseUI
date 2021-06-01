import { Injectable } from '@angular/core';
import { Bulletin, BulletinInterpreter, InputPapers, PapersInterpreter } from 'papersplease';
import { Papers } from 'papersplease/lib/Papers';

@Injectable({
    providedIn: 'root'
})
export class InterpreterService {
    private papersInterpreter: PapersInterpreter;
    private bulletinInterpreter: BulletinInterpreter;
    constructor() {
        this.papersInterpreter = new PapersInterpreter();
        this.bulletinInterpreter = new BulletinInterpreter();
    }

    public interpretPapers(inputPapers: InputPapers): Papers {
        return this.papersInterpreter.interpret(inputPapers);
    }

    public interpretBulletin(bulletinString: string): Bulletin {
        const bulletin = new Bulletin();
        this.bulletinInterpreter.interpret(bulletinString, bulletin);
        return bulletin;
    }
}
