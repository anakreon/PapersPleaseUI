import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserModule } from '../user/user.module';

@NgModule({
    declarations: [DashboardComponent],
    imports: [CommonModule, UserModule]
})
export class DashboardModule {}
