import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPassComponent } from './work-pass.component';

describe('WorkPassComponent', () => {
  let component: WorkPassComponent;
  let fixture: ComponentFixture<WorkPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkPassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
