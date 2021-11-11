import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChallengeListComponent } from './main/challenges/challenge-list/challenge-list.component';
import { CreateChallengeComponent } from './main/challenges/create-challenge/create-challenge.component';
import { AuthGuardGuard } from './route-gaurds/auth-guard.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { JoinTeamComponent } from './main/teams/join-team/join-team.component';
import { CreateTeamComponent } from './main/teams/create-team/create-team.component';
import { LeaderbaordComponent } from './main/teams/leaderbaord/leaderbaord.component';
import { MyTeamComponent } from './main/teams/my-team/my-team.component';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: "dashboard", component: DashboardComponent },
  { path: "", component: ChallengeListComponent },
  { path: "team", component: JoinTeamComponent },
  { path: "team/:id", component: MyTeamComponent },
  { path: "team/create-team", component: CreateTeamComponent },
  { path: "create-challenge", component: CreateChallengeComponent },
  { path: "leaderboard", component: LeaderbaordComponent },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
