import { LeaderbaordComponent } from './main/teams/leaderbaord/leaderbaord.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { ChallengeListComponent } from './main/challenges/challenge-list/challenge-list.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CreateChallengeComponent } from './main/challenges/create-challenge/create-challenge.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeamListComponent } from './main/teams/team-list/team-list.component';
import { JoinTeamComponent } from './main/teams/join-team/join-team.component';
import { CreateTeamComponent } from './main/teams/create-team/create-team.component';
import { MyTeamComponent } from './main/teams/my-team/my-team.component';
import { GroundDashboardComponent } from './main/ground/ground-dashboard/ground-dashboard.component';
import { MatchScoringComponent } from './main/ground/match-scoring/match-scoring.component';
import { MatchPaymentComponent } from './main/ground/match-payment/match-payment.component';

@NgModule({
  declarations: [
    AppComponent,
    ChallengeListComponent,
    HeaderComponent,
    FooterComponent,
    HeaderComponent,
    CreateChallengeComponent,
    PageNotFoundComponent,
    TeamListComponent,
    JoinTeamComponent,
    CreateTeamComponent,
    LeaderbaordComponent,
    MyTeamComponent,
    GroundDashboardComponent,
    MatchScoringComponent,
    MatchPaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
