import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CalenderComponent } from './calender/calender.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { MyPageComponent } from './mypage/mypage.component'; // Adjust import as necessary
import { CompStartComponent } from './comp-start/comp-start.component';
import { EventPageComponent } from './event-page/event-page.component';
import { ResultPageComponent } from './result-page/result-page.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'calender', component: CalenderComponent },
  { path: 'create-event', component: CreateEventComponent },
  { path: 'mypage', component: MyPageComponent },
  { path: 'competition-start', component: CompStartComponent },
  { path: 'event-page', component: EventPageComponent },
  { path: 'result', component: ResultPageComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect empty path to home
  { path: '**', redirectTo: '/home' }, // Redirect unknown paths to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
