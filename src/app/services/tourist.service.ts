import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {FilterTourist, Tourist} from '../model/model';
import {catchError, tap} from 'rxjs/operators';
import {ErrorService} from './error.service';
import {Router} from '@angular/router';
import {MessageService} from './message.service';



const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

export const TOURIST_URL = {
  TOURIST_FORM: environment.APP_URL + '/tourists/tourists',
  TOURIST_LIST: environment.APP_URL + '/tourists/tourists'
};


@Injectable({
  providedIn: 'root'
})
export class TouristService {

  constructor(private _http: HttpClient,
              private _errorService: ErrorService,
              private _router: Router,
              private _messageService: MessageService) {

  }

  public getTouristList(item: FilterTourist): Observable<Tourist[]> {
    return this._http.get(TOURIST_URL.TOURIST_LIST, httpOptions)
      .pipe(
        tap(value => {
          console.log(value);
          console.log(`fetched `);
        }),
        catchError(this._errorService.handleError<any>('get Tourist'))
      );
  }

  public updateTourist(item: Tourist): Observable<any> {
    return this._http.patch(TOURIST_URL.TOURIST_FORM, item, httpOptions).pipe(
      tap(value => {
       // this._router.navigate([TOURIST_URL.TOURIST_LIST]);
        this._messageService.showSuccess('Dane zostały zaktualizowane', 'Sukces');
      }),
      catchError(this._errorService.handleError<any>('update Tourist'))
    );
  }


  public addNewTourist(item: Tourist): Observable<any> {
    return this._http.post(TOURIST_URL.TOURIST_FORM, item, httpOptions).pipe(
      tap(value => {
      //  this._router.navigate([TOURIST_URL.TOURIST_LIST]);
        this._messageService.showSuccess('Dane zostały zapisane', 'Sukces');
      }),
      catchError(this._errorService.handleError<any>('add new tourist'))
    );
  }
}
