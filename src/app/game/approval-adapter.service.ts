import { Injectable } from '@angular/core';
import { InputPapers, Inspector } from 'papersplease';

@Injectable({
    providedIn: 'root'
})
export class ApprovalAdapterService {
    constructor() {}

    public shouldAllow(entrant: InputPapers, inspector: Inspector): boolean {
        const result = inspector.inspect(entrant);
        console.log(result);
        return result.includes('Glory to Arstotzka') || result.includes('Cause no trouble');
    }
    public shouldDeny(entrant: InputPapers, inspector: Inspector): boolean {
        const result = inspector.inspect(entrant);
        console.log(result);
        return result.includes('Entry denied');
    }
    public shouldDetain(entrant: InputPapers, inspector: Inspector): boolean {
        const result = inspector.inspect(entrant);
        console.log(result);
        return result.includes('Detainment');
    }
}
