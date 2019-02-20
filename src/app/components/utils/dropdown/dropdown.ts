/**
 * Options of dropdown
 */
export class Option {
  constructor(id: string, name: string, selected ='') {
    this.id = id;
    this.name = name;
    this.selected = selected;
  }

  id:string;
  name:string;
  selected:string;
}

/**
 * Definition of dropdown
 */
export class Dropdown {
  type:string;
  attributes:Option[];
  constructor(){
    this.attributes =  new Array();
  }
}
