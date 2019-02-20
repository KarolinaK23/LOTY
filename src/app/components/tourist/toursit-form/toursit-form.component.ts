import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {Country, Flight, Sex, Tourist} from '../../../model/model';
import {FlightService} from '../../../services/flight-service';
import {Dropdown, Option} from '../../utils/dropdown/dropdown';
import {MainService} from '../../../services/main.service';
import {TouristService} from '../../../services/tourist.service';
import {CountriesService} from "../../../services/countries.service";

@Component({
  selector: 'app-toursit-form',
  templateUrl: './toursit-form.component.html',
  styleUrls: ['./toursit-form.component.scss']
})
export class ToursitFormComponent implements OnInit {

  /**
   * Representing form with fields to fill.
   */
  touristForm: FormGroup;

  /**
   * Flag contains information if component work in edit mode
   */
  isEdit: boolean = false;

  /**
   * Flag contains information if component work in update mode
   */
  isUpdate: boolean = false;

  /**
   * Reference to current tourist
   */
  tourist: Tourist;

  /**
   * List of flights.
   */
  dataList: any[] = [];

  /**
   * Dropdown contains list of countries
   */
  countries: Dropdown = new Dropdown();

  /**
   * Dropdown contains list of sex
   */
  sexs: Dropdown = new Dropdown();

  public touristFlightsControls: any[];

  submitted: boolean = false;
  isSubmittedButtonDisabled: boolean = false;
  flightForm: any;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private formBuilder: FormBuilder,
              private _flightService: FlightService,
              private _mainService: MainService,
              private _touristService: TouristService,
              private  _countriesService: CountriesService
  ) {
    this._route.queryParams.subscribe(params => {
      if (Object.keys(params).length > 0) {
        if (params['tourist']) {
          this.isEdit = JSON.parse(params['isEdit']);
        this.isUpdate = JSON.parse(params['isEdit']);
        this.tourist = JSON.parse(params['tourist']);
        }
        this.touristForm = this.getNewTouristForm(true, this.tourist);
      } else {
        this.touristForm = this.getNewTouristForm(false);
      }
      this.prepareTouristFlightsForm();
    });
  }

  ngOnInit() {
    this._flightService.getFlightsList().pipe(tap(
      value => this.dataList = value
    )).subscribe(
      value => this.prepareTouristFlightsForm()
    );
    this.sexs = this._mainService.buildSexDrop();
    this.countries = this._mainService.buildCountries();
    this._countriesService.getCountryList().subscribe(ss =>{
      let it: Country[] = ss;
      let opt: Option[] =  new Array();
      for (let c of it) {
        opt.push(new Option(c.id, c.name));
      }
      this.countries.attributes = opt;
    })
  }

  private getNewTouristForm(isEdit: boolean, tourist?: Tourist) {
    return this.formBuilder.group(
      {
        firstName: [this.prepareFormValue('firstName', isEdit, tourist), [Validators.required]],
        lastName: [this.prepareFormValue('lastName', isEdit, tourist), [Validators.required]],
        sex: [this.prepareFormValue('sex', isEdit, tourist), [Validators.required]],
        country: [this.prepareFormValue('country', isEdit, tourist), [Validators.required]],
        dateOfBirth: [this.prepareFormValue('dateOfBirth', isEdit, tourist), [Validators.required]],
        notes: [[], []],
        flights: [[], []],
        dataList: []
      });
  }

  private prepareFormValue(fieldName: string, isDetails: boolean, tourist: Tourist) {
    return {
      value: isDetails ? tourist[fieldName] : '',
      disabled: !this.isEdit
    };
  }


  prepareTouristFlightsForm() {
    this.touristFlightsControls = this.dataList.map(c => new FormControl({
      checked: false,
      name: c.description,
      id: c.id
    }));
  /*  if (this.tourist && this.tourist.flights.length > 0) {
      for (let item of this.tourist.flights) {
        let index = this.dataList.indexOf(this.dataList.find(i => i.id === item.id));
        this.touristFlightsControls[index].value.checked = true;
      }
    } */
    this.touristForm.controls['dataList'] = new FormArray(this.touristFlightsControls);
  }

  get f() {
    return this.touristForm.controls;
  }



  editExistingItem() {
    this.touristForm.enable();
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: {
        ...this._route.snapshot.queryParams,
        isEdit: 'true'
      },
    });
    this.isEdit = true;
    this.isUpdate = true;
  }

  onSubmit() {
    this.submitted = true;
   /* if (this.touristForm.invalid) {
      return;
    } */
    let selectedOrderIds = this.touristForm.value.dataList
      .map((v, i) => v.checked ? v.id : null)
      .filter(v => v !== null);
    console.log(selectedOrderIds);

    let tourist = this.createTourist(selectedOrderIds);
    if (this.isUpdate && this.tourist)  {
      tourist.id = this.tourist.id;
      this.isSubmittedButtonDisabled = true;
      this._touristService.updateTourist(tourist).subscribe();
    } else {
      this.isSubmittedButtonDisabled = true;
      this._touristService.addNewTourist(tourist).subscribe();
    }
    this.submitted = false;
  }


  private createTourist(selectedOrderIds: string[]): Tourist {
    let tourist = new Tourist(this.touristForm.controls.firstName.value,
      this.touristForm.controls.lastName.value,
      this.touristForm.controls.sex.value,
      this.touristForm.controls.country.value,
      this._mainService.convertDate(this.touristForm.controls.dateOfBirth.value));
    let flights = new Array<Flight>();
    for (let item of selectedOrderIds) {
      let fl = new Flight(this.flightForm.controls.departureDate.value,
        this.flightForm.controls.arrivalDate.value,
        this.flightForm.controls.country1.value,
        this.flightForm.controls.country2.value,
        this.flightForm.controls.seats.value,
        this.flightForm.controls.price.value);
      // tslint:disable-next-line:radix
      fl.id = parseInt(item);
      flights.push(fl);
    }
  //  tourist.flights = flights;
    return tourist;
  }


}
