import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PhonevalidatorDirective } from '../../directives/phonevalidator.directive';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-new-imone',
  standalone: true,
  imports: [CommonModule, FormsModule,PhonevalidatorDirective],
  templateUrl: './new-imone.component.html',
  styleUrl: './new-imone.component.scss'
})
export class NewImoneComponent {


  constructor(private companyService:CompanyService){}

  public addNewCompany(newForm:NgForm){
    console.log(newForm);
    console.log(newForm.form.value);
    this.companyService.addNewCompany(newForm.form.value).subscribe(()=> {
      newForm.reset();
    })
   
  }


}
