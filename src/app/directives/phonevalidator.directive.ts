import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appPhonevalidator]',
  standalone: true,
  providers: [
    {
      provide:NG_VALIDATORS,
      useClass:PhonevalidatorDirective,
      multi:true,
    }
  ]
})
export class PhonevalidatorDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    const phoneNumber:string = control.value;

     if (phoneNumber != null) {
      if (!phoneNumber.startsWith('+')) {
        return { 'error': 'Telefono numeris turi prasideti su pliuso zenkliu (+)' };
      }
      if (phoneNumber.length < 10 || phoneNumber.length > 12) {
        return { 'error': 'Netinkamas ilgis, telefono numerio ilgis turi buti nuo 10 iki 12 simboliu' };
      }
    }
    
    return null; 
  }
 

}
