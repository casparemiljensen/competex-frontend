import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'; // Adjust import as necessary
import { CalenderComponent } from './calender/calender.component'; // Adjust import as necessary
import { MyPageComponent } from './mypage/mypage.component'; // Adjust import as necessary
import { CompetitionComponent } from './basic-components/competition/competition.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'calendar', component: CalenderComponent },
  { path: 'mypage', component: MyPageComponent },
  { path: 'competition', component: CompetitionComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect empty path to home
  { path: '**', redirectTo: '/home' } // Redirect unknown paths to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
