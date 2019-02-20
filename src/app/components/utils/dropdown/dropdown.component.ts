import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Dropdown} from "./dropdown";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @Input() inputName: string;
  @Input() labelFloat: string;
  @Input() item: Dropdown = new Dropdown();
  @Input() columnNumber: string;
  @Input() labelNumber: string;
  @Input() generateRowClass: boolean = true;
  @Input() group: FormGroup;
  @Input() submitted: boolean;
  @Input() blocked: boolean;

  private currentModel: any;
  @Output('inputModelChange') modelChange: EventEmitter<any> = new EventEmitter();

  get enterValue(): any {
    return this.currentModel;
  }

  @Input('inputModel') set enterValue(value: any) {
    this.currentModel = value;
    this.modelChange.emit(this.currentModel);
  }

  constructor() {
  }

  ngOnInit() {
    this.labelFloat = this.labelFloat ? this.labelFloat : 'float-xs-left float-sm-left float-md-right float-lg-right';
  }

  onChange(selected) {

  }

}
