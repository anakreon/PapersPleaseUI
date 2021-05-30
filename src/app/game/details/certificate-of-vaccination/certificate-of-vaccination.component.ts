import { Component, Input, OnInit } from '@angular/core';
import { Papers } from 'papersplease';

@Component({
    selector: 'app-certificate-of-vaccination',
    templateUrl: './certificate-of-vaccination.component.html',
    styleUrls: ['./certificate-of-vaccination.component.scss']
})
export class CertificateOfVaccinationComponent implements OnInit {
    @Input() public papers: Papers = null;
    constructor() {}

    ngOnInit(): void {}
}
