import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessPermitComponent } from './access-permit.component';

describe('AccessPermitComponent', () => {
  let component: AccessPermitComponent;
  let fixture: ComponentFixture<AccessPermitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessPermitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessPermitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
