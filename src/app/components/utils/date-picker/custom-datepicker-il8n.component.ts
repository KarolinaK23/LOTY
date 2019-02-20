import {Injectable} from '@angular/core';
import {NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';
import {CustomDateStruct} from './custom-date-structure.component';

const I18N_VALUES = {
  'pl': {
    weekdays: ['Ndz', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'So'],
    shortMonths: ['Stycz', 'Luty', 'Marzec', 'Kwiec', 'Maj', 'Czerw', 'Lip', 'Sier', 'Wrzes', 'Paźdz', 'Listo', 'Grudz'],
    // tslint:disable-next-line:max-line-length
    months: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień']
  }
};

@Injectable()
export class I18n {
  language = 'pl';
}

@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

  constructor(private _i18n: I18n) {
    super();
  }

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
  }

  getMonthShortName(month: number): string {
    return I18N_VALUES[this._i18n.language].shortMonths[month - 1];
  }

  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
    // return I18N_VALUES[this._i18n.language].months[month - 1];
  }

  getDayAriaLabel(date: CustomDateStruct): string {
    return `${date.day}-${date.month}-${date.year} ${date.hour}:${date.minute}:${date.second}`;
  }
}

