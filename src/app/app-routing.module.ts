import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChallengeListComponent } from './main/challenges/challenge-list/challenge-list.component';

const routes: Routes = [{ path: 'true', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
{ path: "", component: ChallengeListComponent },
{path: "dashboard", component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
