import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { BookUpdateService } from 'src/app/shared/services/book-update.service';
import { BookService } from 'src/app/shared/services/book.service';
import {
  Category,
  CategoryService,
} from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
})
export class AddBookComponent implements OnInit {
  bookForm!: FormGroup;
  categories!: Category[];

  constructor(
    private readonly fb: FormBuilder,
    private readonly bookService: BookService,
    private readonly router: Router,
    private readonly categoryService: CategoryService,
    private route: ActivatedRoute,
    private bookUpdateService: BookUpdateService
  ) {
    this.bookForm = this.fb.group({
      BookTitle: ['', Validators.required],
      Author: ['', Validators.required],
      ISBN: [
        '',
        [
          Validators.required,
          Validators.minLength(13),
          Validators.maxLength(13),
        ],
      ],
      CategoryID: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const bookId = params.get('id');
      if (bookId) {
        this.bookService.getBook(+bookId).subscribe((book) => {
          console.log('book', book);
          this.bookForm.patchValue({
            BookTitle: book.BookTitle,
            Author: book.Author,
            ISBN: book.ISBN,
            CategoryID: book.CategoryID,
          });
        });
      } else {
        this.bookForm.reset();
      }
    });
    this.categoryService.getCategoryList().subscribe((categories) => {
      this.categories = categories;
    });
  }

  onSubmit() {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (this.bookForm.valid) {
      let bookObs$: Observable<any>;
      if (bookId) {
        const bookToUpdate = { ...this.bookForm.value, BookID: +bookId };
        console.log('bookToUpdate', bookToUpdate);
        bookObs$ = this.bookService.upDateBook(bookToUpdate);
      } else {
        bookObs$ = this.bookService.addBook(this.bookForm.value);
      }

      bookObs$
        .pipe(
          switchMap(() => {
            this.bookUpdateService.triggerRefresh();
            return of(null);
          })
        )
        .subscribe(() => {
          this.router.navigate(['/book-list']);
        });
    }
  }
}