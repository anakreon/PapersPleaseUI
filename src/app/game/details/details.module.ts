import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { IconDrawerComponent } from './icon-drawer/icon-drawer.component';
import { PassportComponent } from './passport/passport.component';
import { IdCardComponent } from './id-card/id-card.component';
import { WorkPassComponent } from './work-pass/work-pass.component';
import { AccessPermitComponent } from './access-permit/access-permit.component';
import { GrantOfAsylumComponent } from './grant-of-asylum/grant-of-asylum.component';
import { CertificateOfVaccinationComponent } from './certificate-of-vaccination/certificate-of-vaccination.component';
import { DiplomaticAuthorizationComponent } from './diplomatic-authorization/diplomatic-authorization.component';
import { BulletinComponent } from './bulletin/bulletin.component';

@NgModule({
    declarations: [
        DetailsComponent,
        IconDrawerComponent,
        PassportComponent,
        IdCardComponent,
        WorkPassComponent,
        AccessPermitComponent,
        GrantOfAsylumComponent,
        CertificateOfVaccinationComponent,
        DiplomaticAuthorizationComponent,
        BulletinComponent
    ],
    imports: [CommonModule],
    exports: [DetailsComponent]
})
export class DetailsModule {}
