import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { Book, BookService } from 'src/app/shared/services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  books!: Book[];
  sortDirectionAsc: boolean = true;
  titleSortDirectionAsc: boolean = true;

  constructor(private readonly bookService: BookService) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService
      .getBasicBooks()
      .pipe(
        tap((books) => {
          console.log('books', books);
          this.books = books;
        })
      )
      .subscribe();
  }

  sortBooks(sortBy: string): void {
    this.books.sort((a, b) => {
      const valueA = String(a[sortBy]).toLowerCase();
      const valueB = String(b[sortBy]).toLowerCase();
      const compareResult = valueA.localeCompare(valueB);
      return sortBy === 'BookTitle'
        ? this.titleSortDirectionAsc
          ? compareResult
          : -compareResult
        : this.sortDirectionAsc
        ? compareResult
        : -compareResult;
    });
  }

  toggleSortDirection(): void {
    this.sortDirectionAsc = !this.sortDirectionAsc;
  }

  toggleTitleSortDirection(): void {
    this.titleSortDirectionAsc = !this.titleSortDirectionAsc;
  }

  getTitleSortIcon(): string {
    return this.titleSortDirectionAsc ? '▲' : '▼';
  }

  getAuthorSortIcon(): string {
    return this.sortDirectionAsc ? '▲' : '▼';
  }
  onUpdate(bookId: number): void {
    // logika aktualizacji...
  }

  onDelete(bookId: number): void {
    // logika usuwania...
  }

  onPreview(bookId: number): void {
    // logika podglądu...
  }
}
