import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { BookUpdateService } from 'src/app/shared/services/book-update.service';
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

  constructor(
    private readonly bookService: BookService,
    private router: Router,
    private bookUpdateService: BookUpdateService
  ) {}

  ngOnInit(): void {
    this.getBooks();
    this.bookUpdateService.refreshNeeded$.subscribe(() => {
      this.getBooks();
    });
  }
  get isAddBookRoute() {
    return this.router.url.includes('/book-list/add');
  }

  getBooks(): void {
    this.bookService
      .getBooks()
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

  onUpdate(bookId: number): void {
    this.router.navigate(['/book-list/add', bookId]);
  }

  onDelete(bookId: number): void {
    this.bookService.deleteBook(bookId).subscribe(() => {
      this.getBooks();
    });
  }

  onPreview(bookId: number): void {
    console.log('bookId', bookId);
    this.router.navigate(['/preview', bookId]);
  }
}
