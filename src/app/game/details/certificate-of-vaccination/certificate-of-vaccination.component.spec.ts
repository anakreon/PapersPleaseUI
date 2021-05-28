import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateOfVaccinationComponent } from './certificate-of-vaccination.component';

describe('CertificateOfVaccinationComponent', () => {
  let component: CertificateOfVaccinationComponent;
  let fixture: ComponentFixture<CertificateOfVaccinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificateOfVaccinationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateOfVaccinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
