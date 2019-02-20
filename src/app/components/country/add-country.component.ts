import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Country,} from "../../model/model";
import {ActivatedRoute, Router} from "@angular/router";
import {CountriesService} from "../../services/countries.service";


@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.scss']
})
export class AddCountryComponent implements OnInit {

  /**
   * Filter form
   */
  countryForm: FormGroup;

  /**
   * Flag contains information if component work in edit mode
   */
  isEdit: boolean = false;

  /**
   * Flag contains information if component work in update mode
   */
  isUpdate: boolean = false;

  /**
   * Reference to current country
   */
  country: Country;

  dataList: any[] = [];
  public countryControls: any[];
  isSubmittedButtonDisabled: boolean = false;
  submitted: boolean = false;


  constructor(private formBuilder: FormBuilder,
              private _route: ActivatedRoute,
              private _router: Router,
              private _countryService: CountriesService
  ) {
    this._route.queryParams.subscribe(params => {
      if (Object.keys(params).length > 0) {
        console.log("Edit Item");
        this.isEdit = JSON.parse(params['isEdit']);
        this.isUpdate = JSON.parse(params['isEdit']);
        this.country = JSON.parse(params['country']);
        this.countryForm = this.getNewCountryForm(true, this.country);
      } else {
        console.log("New Item");
        this.countryForm = this.getNewCountryForm(false);
      }
      this.prepareCountryForm()
    });
  }

  ngOnInit() {

  }

  private getNewCountryForm(isEdit: boolean, country?: Country) {
    return this.formBuilder.group(
      {
        id: [this.prepareFormValue('id', isEdit, country)],
        name: [this.prepareFormValue('name', isEdit, country), [Validators.required]]
      });
  }

  private prepareFormValue(fieldName: string, isDetails: boolean, country: Country) {
    return {
      value: isDetails ? country [fieldName] : '',
      disabled: !this.isEdit
    };
  }

  prepareCountryForm() {
  }

  get c() {
    return this.countryForm.controls;
  }

  editExistingItem() {
    this.countryForm.enable();
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
    console.log("Click");
    this.submitted = true;

    let country = this.createCountry();
    if (this.country) {
      country.id = this.country.id;
      this.saveCountry(country);
    } else {
      this.saveCountry(country);
    }
  }


  private saveCountry(country) {
    this._countryService.addNewCountry(country).subscribe(rep => {
      console.log(rep);
      this.submitted = false;
    });
  }

  private createCountry(): Country {
    let country = new Country(this.countryForm.controls.id.value,
      this.countryForm.controls.name.value);

    return country;
  }

}
