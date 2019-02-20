import {Time} from "@angular/common";

export enum Sex {
  FEMALE = 'FEMALE',
  MALE = 'MALE'
}

/**
 * Class used to storage information about note
 */
export class Note {
  /**
   * Identifier of note
   */
  id: number;
  /**
   * Creation date of entity
   */
  creationDate: Date;

  /**
   * Body of entity
   */
  body: string;

  /**
   * Constructor
   * @param id - identifier of entity
   * @param body - body of entity
   */
  constructor(id: number,
              body: string) {
    this.id = id;
    this.body = body;
    this.creationDate = new Date();
  }
}

/**
 *Class repressenting Country
 */
export class Country {
  /**
   * Identifier of note
   */
  id: string;

  /**
   * Name of country
   */
  name: string;

  /**
   * Constructor
   * @param id
   * @param name
   */
  constructor(id: string, name: string) {
    this.id = id;
    this.name =  name;
  }
}

/**
 * Class repressenting flight.
 */
export class Flight {

  /**
   * Identifier of flight
   */
  id: number;

  /**
   * Departure date
   */
  departureDate: any;
 /**
 * Flight from
  */
  country1: Country;
  /**
   *
   *  Flight to
   */

  country2: Country;
  /**
   * Arrival date
   */
  arrivalDate: any;
  /**
   * Arrival time
   */

  /**
   * Number of seats
   */
  seats: number;

  /**
   * Price
   */
  price: number;

  /**
   * Tourists asigned to the flight
   */
  tourists: Tourist[];
   /**
   * Constructor
   * @param departureDate
   * @param arrivalDate
    * @param country1
    * @param country2
   * @param price
   */
  constructor(departureDate: any, arrivalDate: any,  country1: Country, country2: Country, seats: number, price: number) {
    this.departureDate = departureDate;
this.country1=country1;
this.country2=country2;
    this.arrivalDate = arrivalDate;

    this.seats = seats;
    this.price = price;
    this.tourists =  new Array();
  }

}

/**
 * Class repressenting tourist.
 * It contains basic informations about Tourist
 */
export class Tourist {

  /**
   * Identifier of tourist
   */
  id: number;
  /**
   * First name
   */
  firstName: string;

  /**
   * Last name
   */
  lastName: string;

  /**
   * Sex
   */
  sex: Sex;

  /**
   * Country
   */
  country: Country;

  /**
   * Notes
   */
  note: Note;

  /**
   * Date of birth
   */
  dateOfBirth: Date;

  /**
   * Flights connected with the tourist
   */
  flights: Flight [];


  /**
   * Constructor
   * @param firstName
   * @param lastName
   * @param sex
   * @param country
   * @param dateOfBirth
   */
  constructor(firstName: string, lastName: string, sex: Sex, country: Country, dateOfBirth: Date) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.sex = sex;
    this.country = country;
    this.dateOfBirth = dateOfBirth;
    this.flights =  new Array();
  }
}

/**
 * Definition of tourist filter
 */
export class FilterTourist extends Tourist {
  totalElements: number;
  totalPages: number;

}
