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

// Agnular Imports
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//  Angular Material Imports 
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { FormInputTextComponent } from './basic-components/formInputs/form-input-text/form-input-text.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ButtonComponent,
    CalenderComponent,
    CreateEventComponent,
    FormComponent,
    FormInputTextComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    MatIconModule,
    MatButtonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
