import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-clock',
    templateUrl: './clock.component.html',
    styleUrls: ['./clock.component.scss']
})
export class ClockComponent {
    @Input() public percentage = 0;
    private stepPerMin = 6;
    private stepPerHour = 30;
    private startMin = 8 * 60; // 8:00
    private minPerPct = 4.8; // to end at 16:00

    public getHourRotate(): string {
        const hourAngle = this.getHourAngle();
        return `rotate(${hourAngle} 20 20)`;
    }
    public getMinuteRotate(): string {
        const minAngle = this.getMinAngle();
        return `rotate(${minAngle} 20 20)`;
    }

    private getHourAngle(): number {
        const hours = Math.floor(this.getCurrentMin() / 60);
        return hours * this.stepPerHour;
    }

    private getMinAngle(): number {
        const mins = this.getCurrentMin() % 60;
        return mins * this.stepPerMin;
    }

    private getCurrentMin(): number {
        return this.startMin + this.percentage * this.minPerPct;
    }
}
