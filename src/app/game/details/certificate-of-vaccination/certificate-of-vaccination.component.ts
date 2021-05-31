import { Component, Input, OnInit } from '@angular/core';
import { Papers } from 'papersplease';
import { CertificateOfVaccination } from 'papersplease/lib/papers/CertificateOfVaccination';

@Component({
    selector: 'app-certificate-of-vaccination',
    templateUrl: './certificate-of-vaccination.component.html',
    styleUrls: ['./certificate-of-vaccination.component.scss']
})
export class CertificateOfVaccinationComponent implements OnInit {
    @Input() public papers: Papers = null;
    public certificate: CertificateOfVaccination;
    public vaccines: string[];

    ngOnInit(): void {
        this.certificate = this.papers.getCertificateOfVaccination();
        this.vaccines = this.certificate.getVaccines();
    }
}
