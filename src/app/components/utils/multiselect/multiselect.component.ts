import {Component, Input, OnInit, AfterViewInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss']
})
export class MultiselectComponent implements OnInit, AfterViewInit {

  @Input() inputLabel: string;
  @Input() searchLabel: string;
  @Input() inputName: string;
  @Input() columnNumber: string;
  @Input() labelNumber: string;
  @Input() placeholder: string;
  @Input() labelFloat: string;
  @Input() group: FormGroup;
  @Input() submitted: boolean;
  @Input() isDisabled: boolean = false;
  @Input() dataList: any[];
  @Input() propertyToDisplay: string;

  private searchValue: string;

  constructor() {
  }

  ngOnInit() {
    this.labelNumber = this.labelNumber ? this.labelNumber : 'col-4';
    this.columnNumber = this.columnNumber ? this.columnNumber : 'col-8';
    this.labelFloat = this.labelFloat ? this.labelFloat : 'float-xs-left float-sm-left float-md-right float-lg-right';
  }

  ngAfterViewInit() {
    this.setMultiselectProperWidth();
    window.addEventListener('resize', this.setMultiselectProperWidth);
  }

  setMultiselectProperWidth() {
    const multiselectSearch = document.querySelectorAll('.multiselect .form-control');
    if (multiselectSearch[0]) {
      const multiselectSearchWidth = (<HTMLElement>multiselectSearch[0]).offsetWidth;
      let multiselectList = document.querySelectorAll('.multiSelect__row__list');
      (<HTMLElement>multiselectList[0]).style.maxWidth = multiselectSearchWidth + 'px';
    }
  }


  onSearchChange(value: any) {
    this.searchValue = value;
  }

  onCheckChange(event, item: any) {
    const formArray: FormArray = this.group.get('dataList') as FormArray;
    formArray.controls.filter(i => i.value.name === item.name)[0].value.checked = event.target.checked;
    this.sortDataList(formArray.controls);
  }

  sortDataList(items: any[]): any[] {
    return items.sort((a, b) => {
      if (a.value.checked) return -1;
      if (b.value.checked) return 1;
      return 0;
    });
  }
}
