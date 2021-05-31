import { Injectable } from '@angular/core';
import { InputPapers, Nation, Purpose } from 'papersplease';

@Injectable({
    providedIn: 'root'
})
export class PaperGeneratorService {
    constructor() {}

    private names: string[] = ['Guyovich, Russian', 'Adamse Wicktora', 'Aino Mikkonen', 'Maciej Wikiel', 'Sean Giroux', 'Sofia Leczera', 'Tina Obetkoff', 'Vania Pardal', 'Viktor Reshetov', 'Yvonna Wilhelm'];
    private nations: Nation[] = ['Arstotzka', 'Antegria', 'Impor', 'Obristan', 'Republia', 'United Federation', 'Kolechia'];
    private randomIds = ['GA07E-Y48AR', 'AS07D-F45SR', 'GCEWD-FU55R', 'BW01Q-1EWS4', 'QD4SG-E5WH1', 'G110D-A23ER', 'GS1EE-UR8R1', '11J7D-FG1HR', 'GDAXD-F1DNV', '2DA7D-F25DJ'];
    private accessPermitPurpose: Purpose[] = ['TRANSIT', 'WORK'];
    private diseases = ['Smallpox', 'Covid-19', 'Rubella', 'Influenza'];

    private bulletins = [
        `Entrants require passport
        Citizens of Antegria, Impor require access permit
        Citizens of Arstotzka require ID card
        Citizens of United Federation require diplomatic authorization
        Citizens of Republia require grant of asylum
        Foreigners require Covid-19 vaccination
        Workers require work pass
        Allow citizens of Arstotzka, Obristan, Antegria, Impor, Republia, United Federation`
    ];

    public needsAccessPermit(nation: Nation): boolean {
        return nation === 'Antegria' || nation === 'Impor';
    }
    public needsIdCard(nation: Nation): boolean {
        return nation === 'Arstotzka';
    }
    public needsDiplomaticAuthorization(nation: Nation): boolean {
        return nation === 'United Federation';
    }
    public needsGrantOfAsylum(nation: Nation): boolean {
        return nation === 'Republia';
    }
    public needsVaccination(nation: Nation): boolean {
        return nation !== 'Arstotzka';
    }

    public generateBulletin(): string {
        return this.bulletins[0];
    }

    public generatePapers(bulletin: string): InputPapers {
        return this.generateValidPapers();
        /*if (this.tossCoin()) {
            return this.generateValidPapers();
        } else if (this.tossCoin() && this.tossCoin()) {
            return this.generatDetainPapers();
        } else {
            return this.generateInvalidPapers();
        }*/
    }

    private tossCoin(): boolean {
        return Math.random() > 0.5;
    }

    private getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    private generateValidPapers(): InputPapers {
        const id = this.randomIds[this.getRandomInt(0, 9)];
        const nation = this.nations[this.getRandomInt(0, 5)];
        const name = this.names[this.getRandomInt(0, 9)];
        const dob = '1933.11.28';
        const sex = Math.random() > 0.5 ? 'M' : 'F';
        const height = '154cm';
        const weight = '75kg';
        const exp = '1983.07.10';

        const papers: InputPapers = {
            passport: this.buildPassport(
                id,
                nation,
                name,
                dob,
                sex,
                nation,
                exp
            )
        };
        if (this.needsIdCard(nation)) {
            papers.ID_card = this.buildID_card(name, nation, height, weight);
        }
        if (this.needsAccessPermit(nation)) {
            const purpose = this.tossCoin() ? this.accessPermitPurpose[0] : this.accessPermitPurpose[1];
            const duration = '1 month';
            papers.access_permit = this.buildAccessPermit(
                id,
                nation,
                name,
                purpose,
                duration,
                height,
                weight,
                exp
            );

            if (purpose === 'WORK') {
                papers.work_pass = this.buildWorkPass();
            }
        }
        if (this.needsDiplomaticAuthorization(nation)) {
            papers.diplomatic_authorization = this.buildDiplomaticAuthorization(id, 'Arstotzka', name, nation, exp);
        }
        if (this.needsVaccination(nation)) {
            papers.certificate_of_vaccination = this.buildCertificateOfVaccination(id, name, 'Covid-19');
        }
        if (this.needsGrantOfAsylum(nation)) {
            papers.grant_of_asylum = this.buildGrantOfAsylum(id, nation, name, exp, dob, height, weight);
        }
        return papers;
    }

    /*private generatDetainPapers(): InputPapers {

    }

    private generateInvalidPapers(): InputPapers {

    }*/

    /*private doStuff(): InputPapers {
        if (this.tossCoin()) {
            this.generateValidPapers();
        } else if (this.tossCoin() && this.tossCoin()) {
            this.generatDetainPapers();
        } else {
            this.generateInvalidPapers();
        }
        return {
            passport: this.buildPassport(
                'GC07D-FU8AR',
                'Arstotzka',
                'Guyovich, Russian',
                '1933.11.28',
                'M',
                'East Grestin',
                '1981.07.10'
            ),
            access_permit: this.buildAccessPermit(
                'GXXXX-FU8AR',
                'Arstotzka',
                'Guyovich, Russian',
                'Fun',
                '3 days',
                '154cm',
                '75kg',
                '1981.2.25'
            ),
            ID_card: this.buildID_card('Guyovich, Russian', '154cm', '75kg'),
            work_pass: this.buildWorkPass(),
            grant_of_asylum: this.buildGrantOfAsylum(
                'GC07D-FU8AR',
                'Arstotzka',
                'Guyovich, Russian',
                '1981.2.25',
                '1933.11.28',
                '154cm',
                '75kg'
            ),
            certificate_of_vaccination: this.buildCertificateOfVaccination(
                'GXXXX-FU8AR',
                'Guyovich, Russian',
                'Smallpox, Covid-19, Rubella'
            ),
            diplomatic_authorization: this.buildDiplomaticAuthorization('GC07D-FU8AR', 'Arstotzka, Antegria, Impor', 'Guyovich, Russian', 'Arstotzka', '1981.2.25')
        };*/

    private buildPassport(
        id: string,
        nation: Nation,
        name: string,
        dob: string,
        sex: string,
        iss: string,
        exp: string
    ): string {
        return `ID#: ${id}
            NATION: ${nation}
            NAME: ${name}
            DOB: ${dob}
            SEX: ${sex}
            ISS: ${iss}
            EXP: ${exp}`;
    }

    private buildAccessPermit(
        id: string,
        nation: Nation,
        name: string,
        purpose: string,
        duration: string,
        height: string,
        weight: string,
        exp: string
    ): string {
        return `ID#: ${id}
            NATION: ${nation}
            NAME: ${name}
            PURPOSE: ${purpose}
            DURATION: ${duration}
            HEIGHT: ${height}
            WEIGHT: ${weight}
            EXP: ${exp}`;
    }

    private buildID_card(name: string, nation: string, height: string, weight: string): string {
        return `NAME: ${name}
            NATION: ${nation}
            HEIGHT: ${height}
            WEIGHT: ${weight}`;
    }

    private buildWorkPass(): string {
        return '';
    }

    private buildGrantOfAsylum(
        id: string,
        nation: Nation,
        name: string,
        exp: string,
        dob: string,
        height: string,
        weight: string
    ): string {
        return `ID#: ${id}
            NATION: ${nation}
            NAME: ${name}
            EXP: ${exp}
            DOB: ${dob}
            HEIGHT: ${height}
            WEIGHT: ${weight}`;
    }

    private buildCertificateOfVaccination(id: string, name: string, vaccines: string): string {
        return `ID#: ${id}
            NAME: ${name}
            VACCINES: ${vaccines}`;
    }

    private buildDiplomaticAuthorization(
        id: string,
        access: string,
        name: string,
        nation: string,
        exp: string
    ): string {
        return `ID#: ${id}
        ACCESS: ${access}
        NAME: ${name}
        NATION: ${nation}
        EXP:  ${exp}`;
    }
}

/*
{
            passport: `ID#: GC07D-FU8AR
                NATION: Arstotzka
                NAME: Guyovich, Russian
                DOB: 1933.11.28
                SEX: M
                ISS: East Grestin
                EXP: 1981.07.10`,
            access_permit: `ID#: GXXXX-FU8AR
                NATION: Arstotzka
                NAME: Guyovich, Russian
                PURPOSE: Fun
                DURATION: 3 days
                HEIGHT: 154cm
                WEIGHT: 75kg
                EXP: 1981.2.25`,
            ID_card: `NAME: Guyovich, Russian
                HEIGHT: 154cm
                WEIGHT: 75kg`,
            work_pass: ``,
            grant_of_asylum: `ID#: GC07D-FU8AR
                NATION: Arstotzka
                NAME: Guyovich, Russian
                EXP: 1981.2.25
                DOB: 1933.11.28
                HEIGHT: 154cm
                WEIGHT: 75kg`,
            certificate_of_vaccination: `ID#: GXXXX-FU8AR
                NAME: Guyovich, Russian
                VACCINES: Smallpox, Covid-19, Rubella`,
            diplomatic_authorization: `ID#: GC07D-FU8AR
                ACCESS: Arstotzka, Antegria, Impor
                NAME: Guyovich, Russian
                NATION: Arstotzka
                EXP: 1981.2.25`
        }
        */
