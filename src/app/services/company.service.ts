import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '../models/company';
import { catchError, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http:HttpClient) { }

  public addNewCompany(company:Company){
    return this.http.post('https://imone-f74d3-default-rtdb.europe-west1.firebasedatabase.app/company.json', company);
  }
  public loadCompanyNames(){
    return this.http.get<{[key:string]: Company}>('https://imone-f74d3-default-rtdb.europe-west1.firebasedatabase.app/company.json')
    .pipe(
      map( (data):Company[]=>{
        let companies = [];
        for(let c in data){
          companies.push({...data[c]})
        }
        return companies;
      })
    )
    .pipe(
      catchError((er,c)=> {
        throw 'Klaida';
      })
    )
  }
}
