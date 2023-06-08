import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Book, BookService } from 'src/app/shared/services/book.service';

@Component({
  selector: 'app-prewiev',
  templateUrl: './prewiev.component.html',
  styleUrls: ['./prewiev.component.scss'],
})
export class PreviewComponent implements OnInit {
  book!: Book;

  constructor(
    private readonly bookService: BookService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bookService
      .getBookDetails(id)
      .pipe(
        tap((book) => {
          console.log('book', book);
          this.book = book;
        })
      )
      .subscribe();
  }
}
