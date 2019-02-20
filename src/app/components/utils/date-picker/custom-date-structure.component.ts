/**
 * Interface of the custom model of the NgbDatepicker and NgbInputDatepicker directives
 */
export interface CustomDateStruct {
  /**
   * The year, for example 2016
   */
  year: number;
  /**
   * The month, for example 1=Jan ... 12=Dec
   */
  month: number;
  /**
   * The day of month, starting at 1
   */
  day: number;
  /**
   * The hour, starting at 00
   */
 hour: number;
  /**
   * The minute, starting at 00
   */
   minute: number;
  /**
   * The second, starting at 00
   */
  second: number;

}
