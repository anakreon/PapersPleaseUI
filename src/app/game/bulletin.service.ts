import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { PaperGeneratorService } from './paper-generator.service';

@Injectable({
    providedIn: 'root'
})
export class BulletinService {
    private bulletin: BehaviorSubject<string>;
    constructor(private paperGeneratorService: PaperGeneratorService) {
        this.bulletin = new BehaviorSubject<string>('');
    }

    public generateBulletin(): void {
        const newBulletin = this.paperGeneratorService.generateBulletin();
        this.bulletin.next(newBulletin);
    }
    public getBulletin(): Observable<string> {
        return this.bulletin.asObservable();
    }
}
