import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Flight} from '../model/model';
import {catchError, tap} from 'rxjs/operators';
import {ErrorService} from './error.service';
import { MessageService } from './message.service';
import { Router } from '../../../node_modules/@angular/router';


const corsHeaders = {
  headers: new HttpHeaders({'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'X-Requested-With'})
};

const corsHeadersOld = {
  origin: ["*"],
  headers: ["Access-Control-Allow-Origin","Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type", "CORELATION_ID"],
  credentials: true,
  additionalHeaders: ['access-control-allow-headers', 'Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, CORRELATION_ID'],
  additionalExposedHeaders: ['access-control-allow-headers', 'Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, CORRELATION_ID']
};

export const FLIGHTS_URL = {
  FLIGHT_FORM: environment.APP_URL + '/flights/flights',
  FLIGHT_LIST: environment.APP_URL + '/flights/flights'
};


@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(private _http: HttpClient,
              private _errorService: ErrorService,
              private _messageService: MessageService,
              private _router: Router) {

  }


  public getFlightsList(): Observable<Flight[]> {
    console.log('getFlightsList',FLIGHTS_URL.FLIGHT_LIST);
    return this._http.get(FLIGHTS_URL.FLIGHT_LIST , corsHeaders)
      .pipe(
        tap(value => {
          console.log(value);
        }),
        catchError(this._errorService.handleError<any>('get Flights'))
      );
  }
  public updateFlight(item: Flight): Observable<any> {
    return this._http.patch(FLIGHTS_URL.FLIGHT_FORM, item, corsHeaders).pipe(
      tap(value => {
        //this._router.navigate([FLIGHTS_URL.FLIGHT_LIST]);
        this._messageService.showSuccess('Dane zostały zaktualizowane', 'Sukces');
      }),
      catchError(this._errorService.handleError<any>('update Flight'))
    );
  }


  public addNewFlight(item: Flight): Observable<any> {
    return this._http.post(FLIGHTS_URL.FLIGHT_FORM, item, corsHeaders).pipe(
      tap(value => {
        //this._router.navigate([FLIGHTS_URL.FLIGHT_LIST]);
        this._messageService.showSuccess('Dane zostały zapisane', 'Sukces');
      }),
      catchError(this._errorService.handleError<any>('add new flight'))
    );
  }
}
