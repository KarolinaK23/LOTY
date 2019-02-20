import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent implements OnInit {

  @Input() inputLabel: string;
  @Input() inputName: string;
  @Input() columnNumber: string;
  @Input() labelNumber: string;
  @Input() placeholder: string;
  @Input() labelFloat: string;
  @Input() pattern: string;
  @Input() type: string;

  @Input() isRequired: boolean = false;

  @Input() maxLength: number;
  @Input() generateRow: boolean = true;

  @Input() group: FormGroup;
  @Input() submitted: boolean;
  @Output('inputModelChange') modelChange: EventEmitter<any> = new EventEmitter();
  private currentModel: any;

  constructor() {
  }

  get enterValue(): any {
    return this.currentModel;
  }

  @Input('inputModel') set enterValue(value: any) {
    this.currentModel = value;
    this.modelChange.emit(this.currentModel);
  }

  ngOnInit() {
    this.labelNumber = this.labelNumber ? this.labelNumber : 'col-4';
    this.columnNumber = this.columnNumber ? this.columnNumber : 'col-8';
    this.labelFloat = this.labelFloat ? this.labelFloat : 'float-xs-left float-sm-left float-md-right float-lg-right';
    this.type = this.type ? this.type : 'text';
  }

  onChange() {

  }

}

