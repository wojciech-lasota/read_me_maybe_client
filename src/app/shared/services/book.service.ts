import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Book {
  BookID: number;
  BookTitle: string;
  Author: string;
  ISBN: string;
  CategoryID: number;
  [key: string]: number | string;
}

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`http://localhost:3000/book-list`);
  }

  getBasicBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`http://localhost:3000/book-list/basic`);
  }
}
