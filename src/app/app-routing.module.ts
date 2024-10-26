import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CalenderComponent } from './calender/calender.component';
import { CreateEventComponent } from './create-event/create-event.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'calender', component: CalenderComponent},
  { path: 'create-event', component: CreateEventComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
