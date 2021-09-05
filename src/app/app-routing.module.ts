import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChallengeListComponent } from './main/challenges/challenge-list/challenge-list.component';
import { CreateChallengeComponent } from './main/challenges/create-challenge/create-challenge.component';
import { AuthGuardGuard } from './route-gaurds/auth-guard.guard';

const routes: Routes = [
  { path: 'true', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  {path: "dashboard", component: DashboardComponent, canActivate: [AuthGuardGuard] },
  { path: "", component: ChallengeListComponent },
  { path: "create-challenge", component: CreateChallengeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
