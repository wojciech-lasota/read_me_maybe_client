import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, of, switchMap, tap } from 'rxjs';
import { BookUpdateService } from 'src/app/shared/services/book-update.service';
import { BookService } from 'src/app/shared/services/book.service';
import {
  Category,
  CategoryService,
} from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
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
      CategoryID: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const bookId = params.get('id');
      if (bookId) {
        this.bookService.getBook(+bookId).subscribe((book) => {
          this.bookForm.patchValue({
            BookTitle: book.BookTitle,
            Author: book.Author,
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
  isUpdating(): boolean {
    return this.route.snapshot.paramMap.has('id');
  }
  onSubmit() {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (this.bookForm.valid) {
      let bookObs$: Observable<any>;
      if (bookId) {
        const bookToUpdate = { ...this.bookForm.value, BookID: +bookId };
        bookObs$ = this.bookService.updateBook(bookToUpdate);
      } else {
        bookObs$ = this.bookService.addBook(this.bookForm.value);
      }

      bookObs$
        .pipe(
          tap(() => {}),
          catchError((error: HttpErrorResponse) => {
            alert(error.error.error);
            throw error;
          }),
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
