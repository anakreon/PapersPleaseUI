import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayOverDialogComponent } from './day-over-dialog.component';

describe('DayOverDialogComponent', () => {
    let component: DayOverDialogComponent;
    let fixture: ComponentFixture<DayOverDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DayOverDialogComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DayOverDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
