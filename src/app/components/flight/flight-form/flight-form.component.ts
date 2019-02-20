import {Flight, Tourist, FilterTourist, Country} from './../../../model/model';
import {Component, OnInit} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormArray
} from '../../../../../node_modules/@angular/forms';
import {
  ActivatedRoute,
  Router
} from '../../../../../node_modules/@angular/router';
import {FlightService} from '../../../services/flight-service';
import {MainService} from '../../../services/main.service';
import {TouristService} from '../../../services/tourist.service';
import {tap} from '../../../../../node_modules/rxjs/operators';
import {
  identifierModuleUrl,
  isNgTemplate
} from '../../../../../node_modules/@angular/compiler';
import {listener} from '../../../../../node_modules/@angular/core/src/render3/instructions';
import {NgbDateFRParserFormatter} from "../../utils/date-picker/ngb-date-parser-formatter.component";
import {Dropdown, Option} from "../../utils/dropdown/dropdown";
import {CountriesService} from "../../../services/countries.service";

@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.scss']
})
export class FlightFormComponent implements OnInit {
  /**
   * Representing form with fields to fill.
   */
  flightForm: FormGroup;
  /**
   * Flag contains information if component work in edit mode
   */
  isEdit: boolean = false;
  /**
   * Dropdown contains list of countries
   */
  country1: Dropdown = new Dropdown();

  country2: Dropdown = new Dropdown();
  /**
   * Flag contains information if component work in update mode
   */
  isUpdate: boolean = false;
  /**
   * Reference to current flights
   */
  flight: Flight;
  /**
   * List of tourist
   */
  dataList: any[] = [];

  public flightFlightsControls: any[];
  submitted: boolean = false;
  isSubmittedButtonDisabled: boolean = false;
  touristForm: any;
  filterTourist: FilterTourist;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private formBuilder: FormBuilder,
    private _flightService: FlightService,
    private _mainService: MainService,
    private _touristService: TouristService,
    private dateFormatter : NgbDateFRParserFormatter,
    private _countriesService : CountriesService
  ) {
    this._route.queryParams.subscribe(params => {
      if (Object.keys(params).length > 0) {
        this.isEdit = JSON.parse(params['isEdit']);
        this.isUpdate = JSON.parse(params['isEdit']);
        this.flight = JSON.parse(params['flight']);
        this.flightForm = this.getNewFlightForm(true, this.flight);
      } else {
        this.flightForm = this.getNewFlightForm(false);
      }
      this.prepareFlightsForm();
    });
  }

  ngOnInit() {
    this.filterTourist = new FilterTourist(null, null, null, null, null);
    this._touristService
      .getTouristList(this.filterTourist)
      .pipe(
        tap(value => {
          this.dataList = value;
          console.log(this.dataList);
        })
      )
      .subscribe(value => this.prepareFlightsForm());
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

  private getNewFlightForm(isEdit: boolean, flight?: Flight) {
    return this.formBuilder.group({
      id: [this.prepareFormValue('id', isEdit, flight), [Validators.required]],
      country1: [this.prepareFormValue('country1', isEdit, flight),
      [Validators.required]],
      country2: [this.prepareFormValue('country2', isEdit, flight),
        [Validators.required]],
      departureDate: [
        this.prepareFormValue('departureDate', isEdit, flight),
        [Validators.required]
      ],
      arrivalDate: [
        this.prepareFormValue('arrivalDate', isEdit, flight),
        [Validators.required]
      ],
      seats: [
        this.prepareFormValue('seats', isEdit, flight),
        [Validators.required]
      ],
      price: [
        this.prepareFormValue('price', isEdit, flight),
        [Validators.required]
      ],
      dataList: []
    });
  }

  private prepareFormValue(
    fieldName: string,
    isDetails: boolean,
    flight: Flight
  ) {
    return {
      value: isDetails ? flight[fieldName] : '',
      disabled: !this.isEdit
    };
  }

  prepareFlightsForm() {
    if (this.dataList) {
      this.flightFlightsControls = this.dataList.map(
        c =>
          new FormControl({
            checked: false,
            name: c.description,
            id: c.id
          })
      );

      this.flightForm.controls['dataList'] = new FormArray(
        this.flightFlightsControls
      );
    }
  }

  get t() {
    return this.flightForm.controls;
  }

  editExistingItem() {
    this.flightForm.enable();
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: {
        ...this._route.snapshot.queryParams,
        isEdit: 'true'
      }
    });
    this.isEdit = true;
    this.isUpdate = true;
  }

  onSubmit() {
    this.submitted = true;

    let selectedOrderIds = this.flightForm.value.dataList
      .map((v, i) => (v.checked ? v.id : null))
      .filter(v => v !== null);
    console.log(selectedOrderIds);

    let flight = this.createFlight(selectedOrderIds);
    if (this.isUpdate && this.flight) {
      flight.id = this.flight.id;
      this.isSubmittedButtonDisabled = true;
      this._flightService.updateFlight(flight).subscribe( resp => {
        this.submitted = false;
      });
    } else {
      this.isSubmittedButtonDisabled = true;
      this._flightService.addNewFlight(flight).subscribe(rep=>{
        console.log(rep);
        this.submitted = false;
      });
    }

  }

  private createFlight(selectedOrderIds: string[]): Flight {
    let flight = new Flight(
      this.dateFormatter.format(this.flightForm.controls.departureDate.value),
      this.dateFormatter.format(this.flightForm.controls.arrivalDate.value),
      this.flightForm.controls.country1.value,
      this.flightForm.controls.country2.value,
      this.flightForm.controls.seats.value,
      this.flightForm.controls.price.value
    );
    let tourist = new Array<Tourist>();
    if (selectedOrderIds) {
      for (let item of selectedOrderIds) {
        let tl = new Tourist(
          this.touristForm.controls.firstName.value,
          this.touristForm.controls.lastName.value,
          this.touristForm.controls.sex.value,
          this.touristForm.controls.country.value,
          this._mainService.convertDate(
            this.touristForm.controls.dateOfBirth.value
          )
        );
        // tslint:disable-next-line:radix
        tl.id = parseInt(item);
        tourist.push(tl);
      }
    }
    return flight;
  }
}
