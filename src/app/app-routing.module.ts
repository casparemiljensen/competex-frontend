import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CalenderComponent } from './calender/calender.component';
import { TableComponent } from './basic-components/table/table.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'calender', component: CalenderComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'table', component: TableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
