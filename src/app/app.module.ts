import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard.component';
import { NavbarComponent } from './components/utils/navbar/navbar.component';
import { NavComponent } from './components/utils/nav/nav.component';
import { RouterModule, Routes } from '@angular/router';
import { ToursitFormComponent } from './components/tourist/toursit-form/toursit-form.component';
import { InputTextComponent } from './components/utils/input-text/input-text.component';
import { DropdownComponent } from './components/utils/dropdown/dropdown.component';
import { MultiselectComponent } from './components/utils/multiselect/multiselect.component';
import { MultiselectFilterPipe } from './components/utils/multiselect/multiselectFilter.pipe';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { GlobalErrorHandlerService } from './services/globalErrorHandler.service';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbdDatepickerPopup } from './components/utils/date-picker/datepicker-popup.component';
import { ContextMenuModule } from 'ngx-contextmenu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TouristListComponent } from './components/tourist/tourist-list/tourist-list.component';
import { FlightListComponent } from './components/flight/flight-list/flight-list.component';
import { FlightFormComponent } from './components/flight/flight-form/flight-form.component';
import {NgbDateFRParserFormatter} from "./components/utils/date-picker/ngb-date-parser-formatter.component";
import { AddCountryComponent } from './components/country/add-country.component';

registerLocaleData(localePl);

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'flights', component: FlightListComponent },
      { path: 'flight', component: FlightFormComponent },
      { path: 'flight/:id', component: FlightFormComponent },
      { path: 'tourists', component: TouristListComponent },
      { path: 'tourist', component: ToursitFormComponent },
      { path: 'tourist/:id', component: ToursitFormComponent },
      { path: 'country', component: AddCountryComponent}
    ]
  }
];

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    NavComponent,
    InputTextComponent,
    DropdownComponent,
    MultiselectComponent,
    MultiselectFilterPipe,
    NgbdDatepickerPopup,
    ToursitFormComponent,
    TouristListComponent,
    FlightListComponent,
    FlightFormComponent,
    AddCountryComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FormsModule, ReactiveFormsModule,
    ContextMenuModule.forRoot({
      useBootstrap4: true,
      autoFocus: true
    }),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-left',
      preventDuplicates: true,
    }),
    NgbModule.forRoot()
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pl' },
    GlobalErrorHandlerService, NgbDateFRParserFormatter,
  { provide: ErrorHandler, useClass: GlobalErrorHandlerService }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
