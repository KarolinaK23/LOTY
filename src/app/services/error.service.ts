import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs/index';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private _messageService: MessageService) {
  }

  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this._messageService.showError(error.error.errorDescription);
      return of(result as T);
    };
  }
}
