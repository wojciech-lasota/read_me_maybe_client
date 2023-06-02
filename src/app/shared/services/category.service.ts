import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Category {
  CategoryID: number;
  CategoryName: string;
  [key: string]: number | string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000/category-list';

  constructor(private http: HttpClient) {}

  getCategoryList() {
    return this.http.get<Category[]>(this.apiUrl);
  }
}
