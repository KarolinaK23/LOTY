import {ErrorHandler, Injectable} from '@angular/core';
import {UNAUTHORIZED, BAD_REQUEST, FORBIDDEN} from "http-status-codes";

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  handleError(error: any) {
    console.error(error);
    let httpErrorCode = error.httpErrorCode;
    switch (httpErrorCode) {
      case UNAUTHORIZED:
        console.log('UNAUTHORIZED');
        break;
      case FORBIDDEN:
        console.log('FORBIDDEN');
        break;
      case BAD_REQUEST:
        console.log('BAD_REQUEST');
        break;
      default:
        console.log('default');
    }
  }
}
