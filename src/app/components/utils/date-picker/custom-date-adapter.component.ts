import {Injectable} from '@angular/core';
import {NgbDateAdapter} from '@ng-bootstrap/ng-bootstrap';
import {
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import {CustomDateStruct} from './custom-date-structure.component';
import {DatePickerService} from './date-picker.service';


@Injectable()
export class CustomDateAdapter extends NgbDateAdapter<CustomDateStruct> {

  constructor(private datePickerService: DatePickerService) {
    super();
  }

  fromModel(date: CustomDateStruct): CustomDateStruct {
    let customDate = date ? {
      year: date.year,
      month: date.month,
      day: date.day,
     hour: date.hour,
      minute: date.minute,
      second: date.second
    } : null;
   /* this.prepareDateTime(date, customDate); */
    return customDate;
  }

  toModel(date: NgbDateStruct): CustomDateStruct {
    return date ? {
        year: date.year,
        month: date.month,
        day: date.day ,
        hour: this.datePickerService.date.hour,
        minute: this.datePickerService.date.minute,
        second: this.datePickerService.date.second
      }
      : null;
  }

 private prepareDateTime(date: CustomDateStruct, customDate) {
    if (date) {
      this.datePickerService.date.hour = customDate.hour;
      this.datePickerService.date.minute = customDate.minute;
      this.datePickerService.date.second = customDate.second;
    }
  }
}
