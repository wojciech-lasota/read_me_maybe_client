import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, tap } from 'rxjs';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
})
export class AddCategoryComponent implements OnInit {
  categoryForm!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required],
    });
    this.route.paramMap.subscribe((params) => {
      const categoryId = params.get('id');
      if (categoryId) {
        this.categoryService
          .getCategoryById(+categoryId)
          .pipe(
            tap((category) => {
              this.categoryForm.patchValue({
                categoryName: category.CategoryName,
              });
            })
          )
          .subscribe();
      } else {
        this.categoryService.getCategoryList().subscribe((categories) => {});
      }
    });
  }
  isUpdating(): boolean {
    return this.route.snapshot.paramMap.has('id');
  }

  onSubmit() {
    const categoryName: string = this.categoryForm.value.categoryName;
    const category = { CategoryName: categoryName };

    const categoryId = this.route.snapshot.paramMap.get('id');
    if (categoryId) {
      // aktualizacja kategorii, jeśli categoryId istnieje
      this.categoryService
        .updateCategory(+categoryId, category)
        .pipe(
          tap(() => {}),
          catchError((error: HttpErrorResponse) => {
            alert(error.error.error);
            throw error;
          })
        )
        .subscribe(() => {});
    } else {
      // tworzenie nowej kategorii, jeśli categoryId nie istnieje
      this.categoryService
        .createCategory(category)
        .pipe(
          tap(() => {}),
          catchError((error: HttpErrorResponse) => {
            alert(error.error.error);
            throw error;
          })
        )
        .subscribe(() => {});
    }
    this.router.navigate(['/category/']);
  }
}
