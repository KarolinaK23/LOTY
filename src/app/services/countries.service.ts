import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Country} from '../model/model';
import {catchError, tap} from 'rxjs/operators';
import {ErrorService} from './error.service';
import {Router} from '@angular/router';
import {MessageService} from './message.service';




const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'X-Requested-With'})

};

export const COUNTRY_URL = {
  COUNTRY_FORM: environment.APP_URL + '/countries/countries',
  COUNTRY_LIST: environment.APP_URL + '/countries/countries'
};


@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private _http: HttpClient,
              private _errorService: ErrorService,
              private _router: Router,
              private _messageService: MessageService) {

  }

  public getCountryList(): Observable<Country[]> {
    console.log('getCountryList',COUNTRY_URL.COUNTRY_LIST);
    return this._http.get(COUNTRY_URL.COUNTRY_LIST ,httpOptions)
      .pipe(
        tap(value => {
          console.log(value);
        }),
        catchError(this._errorService.handleError<any>('get Country'))
      );}


  public addNewCountry(item: Country): Observable<any> {
    return this._http.post(COUNTRY_URL.COUNTRY_FORM, item, httpOptions).pipe(
      tap(value => {
        //this._router.navigate([COUNTRY_URL.COUNTRY_LIST]);
        this._messageService.showSuccess('Dane zostały zapisane', 'Sukces');
      }),
      catchError(this._errorService.handleError<any>('add new country'))
    );
  }

  public updateCountry(item: Country): Observable<any> {
    return this._http.patch(COUNTRY_URL.COUNTRY_FORM, item, httpOptions).pipe(
      tap(value => {
        this._messageService.showSuccess('Dane zostały zaktualizowane', 'Sukces');
      }),
      catchError(this._errorService.handleError<any>('update country '))
    );
  }

}
