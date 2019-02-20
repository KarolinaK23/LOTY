import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '../../../../../node_modules/@angular/forms';
import {Country, Flight} from '../../../model/model';
import { MainService } from '../../../services/main.service';
import { FlightService } from '../../../services/flight-service';
import { tap } from '../../../../../node_modules/rxjs/operators';
import {Dropdown, Option} from "../../utils/dropdown/dropdown";
import {CountriesService} from "../../../services/countries.service";



@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.scss']
})
export class FlightListComponent implements OnInit {

  flightForm: FormGroup;

  country1: Dropdown = new Dropdown();

  country2: Dropdown = new Dropdown();

  private flightsList: Flight[];

  private submitted: boolean = false;

  constructor(private _mainService: MainService,
              private _flightService: FlightService,
              private formBuilder: FormBuilder,
              private _countriesService: CountriesService) {
  }


ngOnInit() { this.createFilterForm();
    this._flightService.getFlightsList().pipe(tap(
      value => this.flightsList = value
    )).subscribe(

    );
  this.country1 = this._mainService.buildCountries();
  this.country2 = this._mainService.buildCountries();

  this._countriesService.getCountryList().subscribe(ss =>{
    let it: Country[] = ss;
    let opt: Option[] =  new Array();
    for (let c of it) {
      opt.push(new Option(c.id, c.name));
    }
    this.country1.attributes = opt;
    this.country2.attributes = opt;
  })
  }

  createFilterForm() {
    this.flightForm = this.formBuilder.group({
      departureDate: ['', []],
      arrivalDate: ['', []],
      country1: ['', []],
      country2: ['', []],
      seats: ['', []],
      price: ['', []]
    });
  }

  get t() {
    return this.flightForm.controls;
  }
  clear() {
    this.flightForm.reset();
    this.submitted = false;
  }

  onSubmit() {
    this.submitted = true;
    if (this.flightForm.invalid) {
      return;
    }
    this._flightService.getFlightsList().subscribe(
      value => {
        this.flightsList = value;
        this.submitted = false;
      });
  }





}
