import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Buy } from '../interfaces/purchase.interface';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private http: HttpClient) { }
  getPurchases(): Promise<any> {
    return this.http.get(`${environment.apiUrl}/purchases`).toPromise();
  }
  
  getPurchase(id:number): Promise<any> {
    return this.http.get(`${environment.apiUrl}/purchases/${id}`).toPromise();
  }

  postPurchase(data: Buy): Promise<any> {
    return this.http.post(`${environment.apiUrl}/purchases`, data).toPromise();

  }

  editePurchase( data: Buy,id: number): Promise<any> {
    return this.http.put(`${environment.apiUrl}/purchases/${id}`, data).toPromise();
  }

  deletePurchase(id: number): Promise<any> {
    return this.http.delete(`${environment.apiUrl}/purchases/${id}`).toPromise();
  }
}
