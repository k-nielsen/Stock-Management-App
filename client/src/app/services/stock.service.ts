import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; // For demonstration, replace with HttpClient for a real API call

export interface StockItem {
  id: number | undefined;
  quantity: number;
  productNumber: string;
  location: string;
}

@Injectable({
  providedIn: 'root' // Or provide in a shared module if not using standalone components
})

export class StockService {
  private apiUrl = 'http://localhost:5033/api/stock';

  constructor(private http: HttpClient) { }

  getStock(): Observable<StockItem[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getStockById(id: number): Observable<StockItem> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createStock(stock: StockItem): Observable<any> {
    return this.http.post<any>(this.apiUrl, stock);
  }

  updateStock(id: number, stock: StockItem): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, stock);
  }

  deleteStock(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
