import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Listshop } from '../models/listshop';
import { Observable, of } from 'rxjs';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  })
};

const apiUrl = 'http://localhost:8080/itemlist';

@Injectable({
  providedIn: 'root'
})
export class ListshopService {

  currentListShopId!: number;

  constructor(private http: HttpClient) { }

  getListShopId(id: number): Observable<Listshop> {
    return this.http.get<Listshop>(apiUrl + "/" + id);
  }

  getListShop(): Observable<Listshop[]> {
    return this.http.get<Listshop[]>(apiUrl);
  };

  getListFromUserpId(id:number): Observable<Listshop[]> {
    return this.http.get<Listshop[]>(apiUrl+"/userId/" + id);
  };

  deleteListShop(id: number): Observable<any>{
    return this.http.delete(apiUrl + "/" + id);
  }

  addListShop(Listshop: Listshop): Observable<any>{
    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("listName", Listshop.listName);
    bodyEncoded.append("dateShop", Listshop.dateShop);
    console.log(Listshop.dateShop);
    bodyEncoded.append("userId", Listshop.userId.toString());
    let body = bodyEncoded.toString();

    return this.http.post(apiUrl, body, httpOptions);
  }

  updateListShop(id: number, Listshop: Listshop): Observable<any>{
    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("listName", Listshop.listName);
    bodyEncoded.append("dateShop", Listshop.dateShop);
    let body = bodyEncoded.toString(); 
    return this.http.put(apiUrl + "/" + id, body, httpOptions);
  }

}
