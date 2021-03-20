import { Component } from '@angular/core';
import { InputPapers, Inspector } from 'papersplease';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'PapersPleaseUI';
    public constructor() {
        const bulletin = `Entrants require passport\nAllow citizens of Arstotzka, Obristan\nCitizens of Obristan require access permit`;

        const inspector = new Inspector();
        inspector.receiveBulletin(bulletin);
        const entrant: InputPapers = {
            passport: `ID#: asdf
                NATION: Obristan
                NAME: Johan Wagner
                DOB: 1933.11.28
                SEX: M
                ISS: East Grestin
                EXP: 2014.11.15`
        };
        console.log('result', inspector.inspect(entrant));
    }
}
