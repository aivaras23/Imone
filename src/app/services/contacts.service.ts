import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contacts } from '../models/contacts';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http:HttpClient) { }

  public addNewContact(contact:Contacts){
    return this.http.post('https://imone-f74d3-default-rtdb.europe-west1.firebasedatabase.app/contacts.json', contact);
  
  }

   public loadContacts(){
    return this.http.get<{[key:string]: Contacts}>('https://imone-f74d3-default-rtdb.europe-west1.firebasedatabase.app/contacts.json')
    .pipe(
      map( (data):Contacts[]=>{
        let contacts = [];
        for(let c in data){
          contacts .push({...data[c]})
        }
        return contacts ;
      })
    )
    .pipe(
      catchError((er,c)=> {
        throw 'Klaida';
      })
    )
  }

}
