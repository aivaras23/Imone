import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Company } from '../../models/company';
import { Contacts } from '../../models/contacts';
import { CompanyService } from '../../services/company.service';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'app-companyinfo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './companyinfo.component.html',
  styleUrl: './companyinfo.component.scss'
})
export class CompanyinfoComponent {
    public companyList:Company[] = [];
    public contactsList:Contacts[]= [];

    constructor(private companyService:CompanyService, private contactsService:ContactsService){
      this.companyService.loadCompanyNames().subscribe((c)=> {
        this.companyList=c;
      })
      this.contactsService.loadContacts().subscribe((c)=> {
        this.contactsList=c;
      })
    }
}
