import { Injectable } from '@angular/core';
import { InputPapers, Nation, Purpose } from 'papersplease';

@Injectable({
    providedIn: 'root'
})
export class PaperGeneratorService {
    private buildMethods: any;
    constructor() {
        this.buildMethods = {
            passport: this.buildPassport.bind(this),
            ID_card: this.buildID_card.bind(this),
            access_permit: this.buildAccessPermit.bind(this),
            diplomatic_authorization: this.buildDiplomaticAuthorization.bind(this),
            certificate_of_vaccination: this.buildCertificateOfVaccination.bind(this),
            grant_of_asylum: this.buildGrantOfAsylum.bind(this),
            work_pass: this.buildWorkPass.bind(this)
        };
    }

    private names: string[] = [
        'Guyovich, Russian',
        'Adamse Wicktora',
        'Aino Mikkonen',
        'Maciej Wikiel',
        'Sean Giroux',
        'Sofia Leczera',
        'Tina Obetkoff',
        'Vania Pardal',
        'Viktor Reshetov',
        'Yvonna Wilhelm'
    ];
    private nations: Nation[] = [
        'Arstotzka',
        'Antegria',
        'Impor',
        'Obristan',
        'Republia',
        'United Federation',
        'Kolechia'
    ];
    private randomIds = [
        'GA07E-Y48AR',
        'AS07D-F45SR',
        'GCEWD-FU55R',
        'BW01Q-1EWS4',
        'QD4SG-E5WH1',
        'G110D-A23ER',
        'GS1EE-UR8R1',
        '11J7D-FG1HR',
        'GDAXD-F1DNV',
        '2DA7D-F25DJ'
    ];
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

    public generatePapers(): InputPapers {
        if (this.tossCoin()) {
            return this.generateValidPapers();
        } else if (this.tossCoin() && this.tossCoin()) {
            return this.generatDetainPapers();
        } else {
            return this.generateInvalidPapers();
        }
    }

    private tossCoin(): boolean {
        return Math.random() > 0.5;
    }

    private tossThreeCoins(): boolean {
        return this.tossCoin() && this.tossCoin() && this.tossCoin();
    }

    private getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    private generate(property: string): string {
        switch (property) {
            case 'id':
                return this.randomIds[this.getRandomInt(0, 9)];
            case 'nation':
                return this.nations[this.getRandomInt(0, 5)];
            case 'name':
                return this.names[this.getRandomInt(0, 9)];
            case 'height':
                return 100 + Math.floor((Math.random() * 100)) + 'cm';
            case 'weight':
                return 30 + Math.floor((Math.random() * 100)) + 'kg';
        }
    }

    private generatePapersData(): any {
        const id = this.generate('id');
        const nation = this.generate('nation');
        const name = this.generate('name');
        const dob = '1933.11.28';
        const sex = Math.random() > 0.5 ? 'M' : 'F';
        const height = this.generate('height');
        const weight = this.generate('weight');
        const exp = '1983.07.10';

        return {
            passport: {
                id,
                nation,
                name,
                dob,
                sex,
                iss: nation,
                exp
            },
            ID_card: {
                name,
                nation,
                height,
                weight
            },
            access_permit: {
                id,
                nation,
                name,
                purpose: this.tossCoin() ? this.accessPermitPurpose[0] : this.accessPermitPurpose[1],
                duration: '1 month',
                height,
                weight,
                exp
            },
            diplomatic_authorization: {
                id,
                access: 'Arstotzka',
                name,
                nation,
                exp
            },
            certificate_of_vaccination: {
                id,
                name,
                vaccines: 'Covid-19'
            },
            grant_of_asylum: {
                id,
                nation,
                name,
                exp,
                dob,
                height,
                weight
            }
        };
    }

    private generatePapersFromData(papersData): InputPapers {
        const papers: InputPapers = {
            passport: this.buildPassport(papersData.passport)
        };
        if (this.needsIdCard(papersData.passport.nation)) {
            papers.ID_card = this.buildID_card(papersData.ID_card);
        }
        if (this.needsAccessPermit(papersData.passport.nation)) {
            papers.access_permit = this.buildAccessPermit(papersData.access_permit);

            if (papersData.access_permit.purpose === 'WORK') {
                papers.work_pass = this.buildWorkPass();
            }
        }
        if (this.needsDiplomaticAuthorization(papersData.passport.nation)) {
            papers.diplomatic_authorization = this.buildDiplomaticAuthorization(papersData.diplomatic_authorization);
        }
        if (this.needsVaccination(papersData.passport.nation)) {
            papers.certificate_of_vaccination = this.buildCertificateOfVaccination(
                papersData.certificate_of_vaccination
            );
        }
        if (this.needsGrantOfAsylum(papersData.passport.nation)) {
            papers.grant_of_asylum = this.buildGrantOfAsylum(papersData.grant_of_asylum);
        }
        return papers;
    }

    private generateValidPapers(): InputPapers {
        const papersData = this.generatePapersData();
        const papers = this.generatePapersFromData(papersData);
        return papers;
    }

    private generatDetainPapers(): InputPapers {
        const papersData = this.generatePapersData();
        const papers = this.generatePapersFromData(papersData);

        let noChange = true;
        while (noChange) {
            Object.keys(papers).forEach((paper) => {
                if (this.tossThreeCoins()) {
                    const paperData = { ...papersData[paper] };
                    const detainProps = ['id', 'nation', 'name', 'weight', 'height'];
                    while (detainProps.length > 0) {
                        const randomProp = detainProps.splice(Math.floor(Math.random() * 5), 1)[0];
                        if (!!paperData[randomProp]) {
                            paperData[randomProp] = this.generate(randomProp);
                            papers[paper] = this.buildMethods[paper](paperData);
                            break;
                        }
                    }
                    noChange = false;
                }
            });
        }
        return papers;
    }

    private generateInvalidPapers(): InputPapers {
        const papersData = this.generatePapersData();
        const papers = this.generatePapersFromData(papersData);

        let noChange = true;
        while (noChange) {
            Object.keys(papers).forEach((paper) => {
                if (this.tossThreeCoins()) {
                    const doesntExpire =
                        paper === 'ID_card' ||
                        paper === 'work_pass' ||
                        paper === 'certificate_of_vaccination' ||
                        paper === 'diplomatic_authorization';
                    const isPassport = paper === 'passport';
                    if (!isPassport && (doesntExpire || this.tossCoin())) {
                        delete papers[paper];
                    } else {
                        const paperData = { ...papersData[paper] };
                        paperData.exp = '1981.07.10'; // is expired
                        papers[paper] = this.buildMethods[paper](paperData);
                    }
                    noChange = false;
                }
            });
        }
        return papers;
    }

    private buildPassport({
        id,
        nation,
        name,
        dob,
        sex,
        iss,
        exp
    }: {
        id: string;
        nation: Nation;
        name: string;
        dob: string;
        sex: string;
        iss: string;
        exp: string;
    }): string {
        return `ID#: ${id}
            NATION: ${nation}
            NAME: ${name}
            DOB: ${dob}
            SEX: ${sex}
            ISS: ${iss}
            EXP: ${exp}`;
    }

    private buildAccessPermit({
        id,
        nation,
        name,
        purpose,
        duration,
        height,
        weight,
        exp
    }: {
        id: string;
        nation: Nation;
        name: string;
        purpose: string;
        duration: string;
        height: string;
        weight: string;
        exp: string;
    }): string {
        return `ID#: ${id}
            NATION: ${nation}
            NAME: ${name}
            PURPOSE: ${purpose}
            DURATION: ${duration}
            HEIGHT: ${height}
            WEIGHT: ${weight}
            EXP: ${exp}`;
    }

    private buildID_card({
        name,
        nation,
        height,
        weight
    }: {
        name: string;
        nation: string;
        height: string;
        weight: string;
    }): string {
        return `NAME: ${name}
            NATION: ${nation}
            HEIGHT: ${height}
            WEIGHT: ${weight}`;
    }

    private buildWorkPass(): string {
        return '';
    }

    private buildGrantOfAsylum({
        id,
        nation,
        name,
        exp,
        dob,
        height,
        weight
    }: {
        id: string;
        nation: Nation;
        name: string;
        exp: string;
        dob: string;
        height: string;
        weight: string;
    }): string {
        return `ID#: ${id}
            NATION: ${nation}
            NAME: ${name}
            EXP: ${exp}
            DOB: ${dob}
            HEIGHT: ${height}
            WEIGHT: ${weight}`;
    }

    private buildCertificateOfVaccination({
        id,
        name,
        vaccines
    }: {
        id: string;
        name: string;
        vaccines: string;
    }): string {
        return `ID#: ${id}
            NAME: ${name}
            VACCINES: ${vaccines}`;
    }

    private buildDiplomaticAuthorization({
        id,
        access,
        name,
        nation,
        exp
    }: {
        id: string;
        access: string;
        name: string;
        nation: string;
        exp: string;
    }): string {
        return `ID#: ${id}
        ACCESS: ${access}
        NAME: ${name}
        NATION: ${nation}
        EXP:  ${exp}`;
    }
}

