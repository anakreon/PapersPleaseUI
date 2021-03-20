import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LayoutModule } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { GameModule } from './game/game.module';

@NgModule({
    declarations: [AppComponent, NavbarComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatToolbarModule,
        LayoutModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        DashboardModule,
        GameModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
