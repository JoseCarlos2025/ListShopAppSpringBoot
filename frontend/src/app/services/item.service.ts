import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../models/item';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  })
};

const apiUrl = 'http://localhost:8080/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  currentItemId!: number;

  constructor(private http: HttpClient) { }

  getItemId(id: number): Observable<Item> {
    return this.http.get<Item>(apiUrl + "/" + id);
  }

  getItem(): Observable<Item[]> {
    return this.http.get<Item[]>(apiUrl);
  };

  getItemFromListShopId(id:number): Observable<Item[]> {
    return this.http.get<Item[]>(apiUrl+"/ItemListId/" + id);
  };

  deleteItem(id: number): Observable<any>{
    return this.http.delete(apiUrl + "/" + id);
  }

  addItem(item: Item): Observable<any>{
    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("name", item.name);
    bodyEncoded.append("itemListId", item.itemListId.toString());
    let body = bodyEncoded.toString();

    return this.http.post(apiUrl, body, httpOptions);
  }

  updateItem(id: number, item: Item): Observable<any>{
    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("name", item.name);
    let body = bodyEncoded.toString(); 
    return this.http.put(apiUrl + "/" + id, body, httpOptions);
  }

}
