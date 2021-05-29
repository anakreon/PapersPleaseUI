import { Injectable } from '@angular/core';
import { InputPapers, Inspector } from 'papersplease';
import { BulletinService } from './bulletin.service';

@Injectable({
    providedIn: 'root'
})
export class ApprovalService {
    private inspector: Inspector;
    constructor(bulletinService: BulletinService) {
        this.inspector = new Inspector();
        bulletinService.getBulletin().subscribe((bulletin: string) => {
            this.inspector.receiveBulletin(bulletin);
        });
    }
    public shouldAllow(entrant: InputPapers): boolean {
        const result = this.inspector.inspect(entrant);
        return result.includes('Glory to Arstotzka') || result.includes('Cause no trouble');
    }
    public shouldDeny(entrant: InputPapers): boolean {
        const result = this.inspector.inspect(entrant);
        return result.includes('Entry denied');
    }
    public shouldDetain(entrant: InputPapers): boolean {
        const result = this.inspector.inspect(entrant);
        return result.includes('Detainment');
    }
}
