import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomaticAuthorizationComponent } from './diplomatic-authorization.component';

describe('DiplomaticAuthorizationComponent', () => {
  let component: DiplomaticAuthorizationComponent;
  let fixture: ComponentFixture<DiplomaticAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiplomaticAuthorizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomaticAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
