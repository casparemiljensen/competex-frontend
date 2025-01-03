import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Our components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ButtonComponent } from './basic-components/button/button.component';
import { CalenderComponent } from './calender/calender.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { EventTableComponent } from './basic-components/event-table/event-table.component';
import { MyPageComponent } from './mypage/mypage.component';
import { NavbarComponent } from './basic-components/navbar/navbar.component';
import { CompetitionFormComponent } from './basic-components/form-competition/form-competition.component';
import { CompetitionPermitsComponent } from './basic-components/form-competition-permits/form-competition-permits.component';
import { FormInputSelectComponent } from './basic-components/form-inputs/form-input-select/form-input-select.component';
import { FormEventInformationComponent } from './basic-components/form-event-information/form-event-information.component';
import { ExpandableTableComponent } from './basic-components/ExpandableTable/ExpandableTable.component';
import { DataTableComponent } from './basic-components/DataTable/DataTable.component';
import { EventPageComponent } from './event-page/event-page.component';
import { CompStartComponent } from './comp-start/comp-start.component';
import { ConfirmDialogComponent } from './basic-components/confirm-dialog/confirm-dialog.component';
import { CompetitionPageComponent } from './competition-page/competition-page.component';
import { FormInputTextComponent } from './basic-components/form-inputs/form-input-text/form-input-text.component';
import { FormTemplateComponent } from './basic-components/form-template/form-template.component';
import { FormInputDateComponent } from './basic-components/form-inputs/form-input-date/form-input-date.component';
import { FormInputTimeComponent } from './basic-components/form-inputs/form-input-time/form-input-time.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { RegistrationFormsComponent } from './basic-components/registration/registration-forms/registration-forms.component';
import { RegistrationFormEventInfoComponent } from './basic-components/registration/registration-form-event-info/registration-form-event-info.component';
import { FormInputNumbersComponent } from './basic-components/form-inputs/form-input-numbers/form-input-numbers.component';
import { RegistrationFormCompetitorInfoComponent } from './basic-components/registration/registration-form-competitor-info/registration-form-competitor-info.component';
import { ResultPageComponent } from './result-page/result-page.component';
import { ResultsOverviewPageComponent } from './results-overview-page/results-overview-page.component';

// Agnular Imports
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

//  Angular Material Imports
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDivider } from '@angular/material/divider';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

//ngx imports
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { CompetitionParticipantsListComponent } from './basic-components/competition-participants-list/competition-participants-list.component';
import { CompetitionResultViewComponent } from './basic-components/competition-result-view/competition-result-view.component';
import { environment } from '../environments/environment';
import { CompetitionRoundDetailsComponent } from './basic-components/competition-round-details/competition-round-details.component';
import { FormValidateViewComponent } from './basic-components/form-validate-view/form-validate-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ButtonComponent,
    CalenderComponent,
    CreateEventComponent,
    FormInputTextComponent,
    FormTemplateComponent,
    FormInputDateComponent,
    FormInputTimeComponent,
    EventTableComponent,
    ExpandableTableComponent,
    DataTableComponent,
    NavbarComponent,
    MyPageComponent,
    EventTableComponent,
    CompStartComponent,
    ConfirmDialogComponent,
    MyPageComponent,
    EventTableComponent,
    CompetitionPermitsComponent,
    CompetitionFormComponent,
    FormInputSelectComponent,
    FormEventInformationComponent,
    MyPageComponent,
    EventPageComponent,
    RegistrationPageComponent,
    RegistrationFormsComponent,
    RegistrationFormEventInfoComponent,
    FormInputNumbersComponent,
    RegistrationFormCompetitorInfoComponent,
    ResultPageComponent,
    ResultsOverviewPageComponent,
    CompetitionPageComponent,
    CompetitionParticipantsListComponent,
    CompetitionResultViewComponent,
    CompetitionRoundDetailsComponent,
    FormValidateViewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    AppRoutingModule,
    MatIconModule,
    MatDialogModule,
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
    MatToolbarModule,
    MatGridListModule,
    MatTableModule,
    MatExpansionModule,
    MatProgressSpinner,
    MatDivider,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    MatCardModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [provideAnimationsAsync(), provideNativeDateAdapter()],
  bootstrap: [AppComponent],
})
export class AppModule {}
