import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CalenderComponent } from './calender/calender.component';
import { CompetitionComponent } from './competition/competition.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'calender', component: CalenderComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'competition', component: CompetitionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
