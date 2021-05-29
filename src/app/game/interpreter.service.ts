import { Injectable } from '@angular/core';
import { InputPapers, PapersInterpreter } from 'papersplease';
import { Papers } from 'papersplease/lib/Papers';

@Injectable({
    providedIn: 'root'
})
export class InterpreterService {
    private interpreter: PapersInterpreter;
    constructor() {
        this.interpreter = new PapersInterpreter();
    }

    public interpret(inputPapers: InputPapers): Papers {
        return this.interpreter.interpret(inputPapers);
    }
}
