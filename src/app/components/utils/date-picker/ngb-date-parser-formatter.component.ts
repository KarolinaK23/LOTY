import {Injectable} from '@angular/core';
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {CustomDateStruct} from './custom-date-structure.component';
import {DatePickerService} from './date-picker.service';

function padNumber(value: number) {
  if (isNumber(value)) {
    return `0${value}`.slice(-2);
  } else {
    return '';
  }
}

function padTimeNumber(value: number, isHour: boolean) {
  if (isHour && isNumber(value)) {
    return value < 24 ? `0${value}`.slice(-2) : `0${23}`.slice(-2);
  } else if (!isHour && isNumber(value)) {
    return value < 59 ? `0${value}`.slice(-2) : `0${59}`.slice(-2);
  } else {
    return '';
  }
}

function isNumber(value: any): boolean {
  return !isNaN(toInteger(value));
}

function toInteger(value: any): number {
  return parseInt(`${value}`, 10);
}


@Injectable()
export class NgbDateFRParserFormatter extends NgbDateParserFormatter {

  constructor(private datePickerService: DatePickerService) {
    super();
  }

  parse(value: string): CustomDateStruct {
    if (value) {
      const dateParts = value.trim().split(' ');
      const date = dateParts[0].trim().split('-');
      let time;
      let timeData
      if (dateParts[1]) {
        time = dateParts[1].trim().split(':');
      }

      if (date.length === 2 && isNumber(date[0]) && isNumber(date[1])) {
        if (time) {
          timeData = this.convertTime(time);
        }
        this.datePickerService.date = {
          year: new Date().getFullYear(),
          month: toInteger(date[1]),
          day: toInteger(date[0]),
         hour: timeData ? toInteger(padTimeNumber(timeData[0], true)) : 0,
          minute: timeData ? toInteger(padTimeNumber(timeData[1], false)) : 0,
          second: timeData ? toInteger(padTimeNumber(timeData[2], false)) : 0
        }
        return {
          year: new Date().getFullYear(),
          month: toInteger(date[1]),
          day: toInteger(date[0]),
       hour: timeData ? toInteger(padTimeNumber(timeData[0], true)) : 0,
          minute: timeData ? toInteger(padTimeNumber(timeData[1], false)) : 0,
          second: timeData ? toInteger(padTimeNumber(timeData[2], false)) : 0
        };
      } else if (date.length === 3 && isNumber(date[0]) && isNumber(date[1]) && isNumber(date[2])) {
        if (time) {
          timeData = this.convertTime(time);
        }
        this.datePickerService.date = {
          year: new Date().getFullYear(),
          month: toInteger(date[1]),
          day: toInteger(date[0]),
         hour: timeData ? toInteger(padTimeNumber(timeData[0], true)) : 0,
          minute: timeData ? toInteger(padTimeNumber(timeData[1], false)) : 0,
          second: timeData ? toInteger(padTimeNumber(timeData[2], false)) : 0
        }
        return {
          year: this.convertYear(date[2]),
          month: toInteger(date[1]),
          day: toInteger(date[0]),
          hour: timeData ? toInteger(padTimeNumber(timeData[0], true)) : 0,
          minute: timeData ? toInteger(padTimeNumber(timeData[1], false)) : 0,
          second: timeData ? toInteger(padTimeNumber(timeData[2], false)) : 0
        };
      }
    }
    return null;
  }

  format(date: CustomDateStruct): string {
    let stringDate: string = '';
    if (date) {
    date.hour = this.datePickerService.date.hour ? this.datePickerService.date.hour : 0;
      date.minute = this.datePickerService.date.minute ? this.datePickerService.date.minute : 0;
      date.second = this.datePickerService.date.second ? this.datePickerService.date.second : 0;
      stringDate += isNumber(date.day) ? padNumber(date.day) + '.' : '';
      stringDate += isNumber(date.month) ? padNumber(date.month) + '.' : '';
      stringDate += date.year + ' ';
    stringDate += padTimeNumber(date.hour, true) + ':';
      stringDate += padTimeNumber(date.minute, false) + ':';
      stringDate += padTimeNumber(date.second, false);
    }
    this.datePickerService.clearDate();
    return stringDate;
  }

  convertTime(time: any): number[] {
    if (time) {
      if (time.length === 1 && isNumber(time[0])) {
        return [toInteger(time[0]), 0, 0];
      } else if (time.length === 2 && isNumber(time[0]) && isNumber(time[1])) {
        return [toInteger(time[0]), toInteger(time[0]), 0];
      } else if (time.length === 3 && isNumber(time[0]) && isNumber(time[1]) && isNumber(time[2])) {
        return [toInteger(time[0]), toInteger(time[1]), toInteger(time[2])];
      }
      return [0, 0, 0];
    }
  }

  convertYear(year: string): number {
    let stringDate: string = '';
    let tempYear = year.split('');
    if (tempYear.length === 1) {
      stringDate += '200' + tempYear.join('');
      return toInteger(stringDate);
    } else if (tempYear.length === 2 && isNumber(tempYear[0]) && isNumber(tempYear[1])) {
      stringDate += '20' + tempYear.join('');
      return toInteger(stringDate);
    } else if (tempYear.length === 3 && isNumber(tempYear[0]) && isNumber(tempYear[1]) && isNumber(tempYear[2])) {
      stringDate += '2' + tempYear.join('');
      return toInteger(stringDate);
    } else if (tempYear.length === 4 && isNumber(tempYear[0]) && isNumber(tempYear[1]) && isNumber(tempYear[2]) && isNumber(tempYear[3])) {
      stringDate = tempYear.join('');
      return toInteger(stringDate);
    }
    return new Date().getFullYear();
  }
}
