import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PhonevalidatorDirective } from '../../directives/phonevalidator.directive';
import { CompanyService } from '../../services/company.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-new-imone',
  standalone: true,
  imports: [CommonModule, FormsModule,PhonevalidatorDirective],
  templateUrl: './new-imone.component.html',
  styleUrl: './new-imone.component.scss',
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
    ])
  ]
})
export class NewImoneComponent {

  public inputState = ['normal','normal','normal','normal','normal','normal'];

  constructor(private companyService:CompanyService){}

  public addNewCompany(newForm:NgForm){
    console.log(newForm);
    console.log(newForm.form.value);
    this.companyService.addNewCompany(newForm.form.value).subscribe(()=> {
      newForm.reset();
    })
   
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
