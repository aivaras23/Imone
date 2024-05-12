import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactsService } from '../../services/contacts.service';
import { Company } from '../../models/company';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-new-kontaktai',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './new-kontaktai.component.html',
  styleUrl: './new-kontaktai.component.scss'
})
export class NewKontaktaiComponent {

  public contactForm:FormGroup;
  public companyNames: Company[] = [];

  constructor(private contactsService:ContactsService, private companyService:CompanyService){
    this.contactForm = new FormGroup({
      'name':new FormControl(null, [Validators.required, Validators.minLength(2)]),
      'surname':new FormControl(null, [Validators.required, Validators.minLength(2)]),
      'position':new FormControl(null, [Validators.required, Validators.minLength(2)]),
      'company': new FormControl(null),
      'phonenumbers': new FormArray([
        new FormControl(null, Validators.required)
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
    const newInput = new FormControl(null, Validators.required);
    (this.contactForm.get('phonenumbers') as FormArray).push(newInput);
  }
  delPhoneNumber(){
    (this.contactForm.get('phonenumbers') as FormArray).removeAt(-1);
  }

  public loadCompanyNames(){
    this.companyService.loadCompanyNames().subscribe((data)=> {
      this.companyNames = data;
    })
  }

}
