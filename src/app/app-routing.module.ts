import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'; // Adjust import as necessary
import { CalenderComponent } from './calender/calender.component'; // Adjust import as necessary
import { MyPageComponent } from './mypage/mypage.component'; // Adjust import as necessary
import { CompetitionComponent } from './competition/competition.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'calendar', component: CalenderComponent },
  { path: 'mypage', component: MyPageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect empty path to home
  { path: '**', redirectTo: '/home' }, // Redirect unknown paths to home
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
