import {Component, Input, Output, EventEmitter} from '@angular/core';
import {NgbDateAdapter} from '@ng-bootstrap/ng-bootstrap';
import {
  NgbDatepickerI18n,
  NgbDatepickerConfig,
  NgbDateParserFormatter
} from '@ng-bootstrap/ng-bootstrap';
import {NgbDateFRParserFormatter} from './ngb-date-parser-formatter.component';
import {CustomDateAdapter} from './custom-date-adapter.component';
import {I18n} from './custom-datepicker-il8n.component';
import {CustomDatepickerI18n} from './custom-datepicker-il8n.component';
import {FormGroup} from '@angular/forms';
import {DatePickerService} from './date-picker.service';

@Component({
  selector: 'ngbd-datepicker-popup',
  styleUrls: ['./datepicker-popup.component.scss'],
  templateUrl: './datepicker-popup.component.html',
  providers: [
    I18n,
    NgbDatepickerConfig,
    {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n},
    {provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter},
    {provide: NgbDateAdapter, useClass: CustomDateAdapter},
  ]
})
export class NgbdDatepickerPopup {

  @Input() name: string;
  @Input() inputName: string;
  @Input() placeholder: string;

  @Input() group: FormGroup;
  @Input() submitted: boolean;

  @Input() disabled: boolean = false;

  @Output('inputModelChange') modelChange: EventEmitter<any> = new EventEmitter();
  private currentModel: any;

  constructor(private config: NgbDatepickerConfig,
              private datePickerService: DatePickerService) {
    config.minDate = {year: 1900, month: 1, day: 1};
    //show days from outside months
    // config.outsideDays = 'collapsed';
    config.firstDayOfWeek = 2;
  }

  ngOnInit() {
    this.placeholder = this.placeholder != null ? this.placeholder : 'dd-mm-yyyy hh:mm:ss';
  }

  get enterValue(): any {
    return this.currentModel;
  }

  @Input('inputModel') set enterValue(value: any) {
    this.currentModel = value;
    this.modelChange.emit(this.currentModel);
  }

  onDateChange() {
  }

  clearDatePicker() {
    this.datePickerService.clearDate();
  }
}
