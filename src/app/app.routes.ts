import { Routes } from '@angular/router';
import { NewImoneComponent } from './components/new-imone/new-imone.component';
import { NewKontaktaiComponent } from './components/new-kontaktai/new-kontaktai.component';
import { CompanyinfoComponent } from './components/companyinfo/companyinfo.component';

export const routes: Routes = [
    {path:'addCompany',component:NewImoneComponent},
    {path:'addContact',component:NewKontaktaiComponent},
    {path:'companyInfo',component:CompanyinfoComponent}
];
