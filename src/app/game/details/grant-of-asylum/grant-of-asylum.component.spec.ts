import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantOfAsylumComponent } from './grant-of-asylum.component';

describe('GrantOfAsylumComponent', () => {
  let component: GrantOfAsylumComponent;
  let fixture: ComponentFixture<GrantOfAsylumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrantOfAsylumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrantOfAsylumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
