import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PhonevalidatorDirective } from '../../directives/phonevalidator.directive';

@Component({
  selector: 'app-new-imone',
  standalone: true,
  imports: [CommonModule, FormsModule,PhonevalidatorDirective],
  templateUrl: './new-imone.component.html',
  styleUrl: './new-imone.component.scss'
})
export class NewImoneComponent {

  public addNewCompany(newForm:NgForm){
    console.log(newForm);
    console.log(newForm.form.value)
  }


}
