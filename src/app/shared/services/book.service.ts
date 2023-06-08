import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
    return this.http.get<Book[]>(`${environment.baseUrl}/book-list`);
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${environment.baseUrl}/book-list/${id}`);
  }

  getBasicBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.baseUrl}/book-list/basic`);
  }
  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${environment.baseUrl}/book-list`, book);
  }
  upDateBook(book: Book): Observable<Book> {
    return this.http.patch<Book>(
      `${environment.baseUrl}/book-list/${book.BookID}`,
      book
    );
  }
  deleteBook(id: number): Observable<Book> {
    return this.http.delete<Book>(`${environment.baseUrl}/book-list/${id}`);
  }
}
