import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { ChallengeListComponent } from './main/challenges/challenge-list/challenge-list.component';
@NgModule({
  declarations: [
    AppComponent,
    ChallengeListComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
