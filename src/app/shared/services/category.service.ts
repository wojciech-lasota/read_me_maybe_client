import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Category {
  CategoryID: number;
  CategoryName: string;
  [key: string]: number | string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private _categories = new Subject<Category[]>();
  categories$ = this._categories.asObservable();
  private apiUrl = `${environment.baseUrl}/categories`;

  constructor(private http: HttpClient) {}

  // Pobiera wszystkie kategorie
  getCategoryList() {
    return this.http.get<Category[]>(`${this.apiUrl}`);
  }

  // Tworzy nową kategorię
  createCategory(category: { CategoryName: string }) {
    return this.http.post<Category>(`${this.apiUrl}/create`, category).pipe(
      tap(() => {
        this.getCategoryList().subscribe((categories) => {
          this._categories.next(categories);
        });
      })
    );
  }

  // Pobiera szczegóły kategorii o podanym ID
  getCategoryById(id: number) {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }

  // Aktualizuje kategorię o podanym ID
  updateCategory(id: number, category: { CategoryName: string }) {
    return this.http
      .patch<Category>(`${this.apiUrl}/${id}/update`, category)
      .pipe(
        tap(() => {
          this.getCategoryList().subscribe((categories) => {
            this._categories.next(categories);
          });
        })
      );
  }

  // Usuwa kategorię o podanym ID
  deleteCategory(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}/delete`).pipe(
      tap(() => {
        this.getCategoryList().subscribe((categories) => {
          this._categories.next(categories);
        });
      })
    );
  }
}
