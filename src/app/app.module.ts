import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDivider } from '@angular/material/divider';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { InMemoryDataService } from './service/InMomoryData/in-memory-data.service';

import { ButtonComponent } from './basic-components/button/button.component';
import { HomeComponent } from './home/home.component';
import { CalenderComponent } from './calender/calender.component';
import { MyPageComponent } from './mypage/mypage.component';
import { NavbarComponent } from './basic-components/navbar/navbar.component';
import { EventTableComponent } from './basic-components/event-table/event-table.component';
import { ExpandableTableComponent } from './basic-components/ExpandableTable/ExpandableTable.component';
import { DataTableComponent } from './basic-components/DataTable/DataTable.component';
import { EventPageComponent } from './event-page/event-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ButtonComponent,
    CalenderComponent,
    EventTableComponent,
    ExpandableTableComponent,
    DataTableComponent,
    NavbarComponent,
    MyPageComponent,   
    EventPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    AppRoutingModule, 
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    MatTableModule,
    MatExpansionModule,
    MatProgressSpinner,
    MatDivider,
    MatTableModule, 
    MatPaginatorModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false}
    )
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
