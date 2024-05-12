import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contacts } from '../models/contacts';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http:HttpClient) { }

  public addNewContact(contact:Contacts){
    return this.http.post('https://imone-f74d3-default-rtdb.europe-west1.firebasedatabase.app/contacts.json', contact);
  
  }

}
