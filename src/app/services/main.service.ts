import {Injectable} from '@angular/core';
import {CustomDateStruct} from '../components/utils/date-picker/custom-date-structure.component';
import {Dropdown, Option} from '../components/utils/dropdown/dropdown';
import {Sex} from '../model/model';


@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor() {
  }


  public convertDate(customDateStruct: CustomDateStruct): Date {
    let date = new Date(
      customDateStruct.year,
      customDateStruct.day,
      customDateStruct.hour,
      customDateStruct.minute,
      customDateStruct.second
    );
    return date;
  }

  public buildSexDrop(): Dropdown {
    let sexs = new Dropdown();
    sexs.type = 'TOURIST.SEX';
    sexs.attributes.push(new Option(Sex.FEMALE, '' + Sex.FEMALE));
    sexs.attributes.push(new Option(Sex.MALE, '' + Sex.MALE));
    return sexs;
  }

  public buildCountries(): Dropdown {
    let countries = new Dropdown();
  countries.type = 'TOURIST.COUNTRY';
    countries.attributes = new Array();
     // this.countries.attributes
    return countries;
  }
}
