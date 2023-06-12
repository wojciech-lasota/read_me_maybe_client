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
  CategoryName: number;
  [key: string]: number | string;
}

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.baseUrl}/books`);
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${environment.baseUrl}/books/${id}`);
  }
  getBookDetails(id: number): Observable<Book> {
    return this.http.get<Book>(`${environment.baseUrl}/books/${id}/details`);
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${environment.baseUrl}/books/create`, book);
  }
  updateBook(book: Book): Observable<Book> {
    return this.http.patch<Book>(
      `${environment.baseUrl}/books/${book.BookID}/update`,
      book
    );
  }
  deleteBook(id: number): Observable<Book> {
    return this.http.delete<Book>(`${environment.baseUrl}/books/${id}/delete`);
  }
}
