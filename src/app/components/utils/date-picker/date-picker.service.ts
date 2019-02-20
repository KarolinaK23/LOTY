import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatePickerService {

  date = {
    year: 0,
    month: 0,
    day: 0,
   hour: 0,
    minute: 0,
    second: 0
  }

  clearDate() {
    this.date = {
      year: 0,
      month: 0,
      day: 0,
      hour: 0,
      minute: 0,
      second: 0
    }
  }

}
