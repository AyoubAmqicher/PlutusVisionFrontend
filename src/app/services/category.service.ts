import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Category {
  id: number;
  name: string;
  descriptions: string;
  type: string;  // TransactionType enum in backend
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:8080/api/categories';

  constructor(private http: HttpClient) {}

  getCategoriesByType(type: 'EXPENSE' | 'INCOME'): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/type/${type}`);
  }
}
