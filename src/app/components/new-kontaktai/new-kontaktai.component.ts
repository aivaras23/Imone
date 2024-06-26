import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ContactsService } from '../../services/contacts.service';
import { Company } from '../../models/company';
import { CompanyService } from '../../services/company.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-new-kontaktai',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './new-kontaktai.component.html',
  styleUrl: './new-kontaktai.component.scss',
animations: [
    trigger('inputField',[
      state('normal',style({
        'font-size':'16px',
        'height':'30px',
      })),
      state('focus',style({
        'font-size':'25px',
        'height':'40px',
      })),
      transition('* <=> *',[
        animate(300)
      ])
    ]),
    trigger('errorSpan',[
      state('*',style({
        'opacity':'1',
      })),
      transition('void => *',[
        style({
          'opacity':'0',
        }),
        animate(500,style({
          'opacity':'0'
        })),
        animate(500)
      ]),
      transition('* => void',[
        animate(500,style({
          'opacity':'0'
        })),
        animate(500,style({
          'opacity':'0'
        })),
      ])
    ]),
    trigger('caption',[
      state('initial',style({
        'opacity':'0.5'
      })),
      state('normal',style({
        'opacity':'1'
      })),
      transition('initial => normal',[
        animate(1000)
      ]),
    ])
  ]
})
export class NewKontaktaiComponent {

  public contactForm:FormGroup;
  public companyNames: Company[] = [];

  public inputState = ['normal','normal','normal','normal','normal'];

  public numberState = 'normal';

  constructor(private contactsService:ContactsService, private companyService:CompanyService){
    this.contactForm = new FormGroup({
      'name':new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      'surname':new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      'position':new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      'company': new FormControl(null, [Validators.required]),
      'phonenumbers': new FormArray([
        new FormControl(null, [Validators.required, this.validateNumber])
      ])
    })
    this.loadCompanyNames();
  }

  submitContacts(){
    console.log('Pridetas naujas kontaktas i DB');
    this.contactsService.addNewContact(this.contactForm.value).subscribe(()=> {
      this.contactForm.reset();
      (this.contactForm.get('phonenumbers') as FormArray).controls=[
        new FormControl(null, Validators.required)
      ];
    })
  }
  get phonenumbers(){
    return (this.contactForm.get('phonenumbers') as FormArray).controls;
  }

  addPhoneNumber(){
      this.numberState = 'initial';
      setTimeout(()=> {
      const newInput = new FormControl(null, Validators.required);
      (this.contactForm.get('phonenumbers') as FormArray).push(newInput);
      this.numberState = 'normal';
      },100)
    
  }
  delPhoneNumber(){
    (this.contactForm.get('phonenumbers') as FormArray).removeAt(-1);
  }

  public loadCompanyNames(){
    this.companyService.loadCompanyNames().subscribe((data)=> {
      this.companyNames = data;
    })
  }

  validateNumber(control: AbstractControl<any, any>): ValidationErrors | null {
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

    public inputFocus(id:number,state:boolean){
    if(state === true){
      this.inputState[id]='focus';
    }
    else {
      this.inputState[id]='normal';
    }
  }


}
