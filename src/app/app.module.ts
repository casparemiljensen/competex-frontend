import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Our Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ButtonComponent } from './basic-components/button/button.component';
import { CalenderComponent } from './calender/calender.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { FormComponent } from './basic-components/form/form.component';
import { MatPaginator } from '@angular/material/paginator'; 
import { EventTableComponent } from './basic-components/event-table/event-table.component';
import { MyPageComponent } from './mypage/mypage.component';
import { NavbarComponent } from './basic-components/navbar/navbar.component';


// Agnular Imports
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InMemoryDataService } from './service/InMomoryData/in-memory-data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';



//  Angular Material Imports 
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { FormInputTextComponent } from './basic-components/formInputs/form-input-text/form-input-text.component';
import { FormTemplateComponent } from './basic-components/form-template/form-template.component';
import { FormInputDateComponent } from './basic-components/formInputs/form-input-date/form-input-date.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import { FormInputTimeComponent } from './basic-components/formInputs/form-input-time/form-input-time.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDivider } from '@angular/material/divider';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

//ngx imports 
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ButtonComponent,
    CalenderComponent,
    CreateEventComponent,
    FormComponent,
    FormInputTextComponent,
    FormTemplateComponent,
    FormInputDateComponent,
    FormInputTimeComponent,
    NavbarComponent,
    MyPageComponent,   
    EventTableComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    AppRoutingModule, 
    MatIconModule,
    MatButtonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule, 
    MatDatepickerModule,
    MatFormFieldModule,
    MatPaginator,
    NgxMatTimepickerModule,
    MatToolbarModule,
    MatTableModule,
    MatExpansionModule,
    MatProgressSpinner,
    MatDivider,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false}
    )
  ],
  providers: [
    provideAnimationsAsync(), 
    provideNativeDateAdapter(),
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
