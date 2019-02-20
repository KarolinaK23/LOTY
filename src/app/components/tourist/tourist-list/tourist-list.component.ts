import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Country, FilterTourist, Tourist} from '../../../model/model';
import {Dropdown, Option} from '../../utils/dropdown/dropdown';
import {MainService} from '../../../services/main.service';
import {TouristService} from '../../../services/tourist.service';
import {tap} from 'rxjs/operators';
import {CountriesService} from "../../../services/countries.service";

@Component({
  selector: 'app-tourist-list',
  templateUrl: './tourist-list.component.html',
  styleUrls: ['./tourist-list.component.scss']
})
export class TouristListComponent implements OnInit {

  /**
   * Filter form
   */
  touristForm: FormGroup;

  private touristsList: Tourist[];

  /**
   * Dropdown contains list of countries
   */
  countries: Dropdown = new Dropdown();

  /**
   * Dropdown contains list of sex
   */
  sexs: Dropdown = new Dropdown();

  private submitted: boolean = false;

  constructor(private _mainService: MainService,
              private _touristService: TouristService,
              private formBuilder: FormBuilder,
              private _countriesService: CountriesService) {
  }

  ngOnInit() {
    this.createFilterForm();
    this._touristService.getTouristList(this.createFilterCriteria()).pipe(tap(
      value => this.touristsList = value
    )).subscribe(

    );
    this.sexs = this._mainService.buildSexDrop();
    this.countries = this._mainService.buildCountries();
    this._countriesService.getCountryList().subscribe(ss =>{
      let it: Country[] = ss;
      let opt: Option[] =  new Array();
      for (let c of it) {
        opt.push(new Option(c.id, c.name));
      }
      this.countries.attributes = opt; })
  }

  /**
   * It creates form used to filtering.
   */
  createFilterForm() {
    this.touristForm = this.formBuilder.group({
      lastName: ['', []],
      firstName: ['', []],
      sex: ['', []],
      country: ['', []]
    });
  }

  get f() {
    return this.touristForm.controls;
  }

  clear() {
    this.touristForm.reset();
    this.submitted = false;
  }

  onSubmit() {
    this.submitted = true;
    if (this.touristForm.invalid) {
      return;
    }
    this._touristService.getTouristList(this.createFilterCriteria()).subscribe(
      value => {
        this.touristsList = value;
        this.submitted = false;
      });
  }

  private createFilterCriteria(): FilterTourist {
    let filterTourist =  new FilterTourist( this.touristForm.controls.firstName.value,
      this.touristForm.controls.firstName.value,
      this.touristForm.controls.sex.value,
      this.touristForm.controls.country.value,
      null);
      return filterTourist;
  }
}
