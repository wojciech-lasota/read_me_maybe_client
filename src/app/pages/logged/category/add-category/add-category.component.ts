import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { pipe, tap } from 'rxjs';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
  categoryForm!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly categoryService: CategoryService,
    private route: ActivatedRoute
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
              console.log('category', category);
              this.categoryForm.patchValue({
                categoryName: category.CategoryName,
              });
            })
          )
          .subscribe();
      } else {
        this.categoryService.getCategoryList().subscribe((categories) => {
          console.log('categories', categories);
        });
      }
    });
  }
  isUpdating(): boolean {
    return this.route.snapshot.paramMap.has('id');
  }

  onSubmit() {
    console.log('categoryForm', this.categoryForm.value);
    const categoryName: string = this.categoryForm.value.categoryName;
    const category = { CategoryName: categoryName };

    const categoryId = this.route.snapshot.paramMap.get('id');
    if (categoryId) {
      // aktualizacja kategorii, jeśli categoryId istnieje
      this.categoryService
        .updateCategory(+categoryId, category)
        .subscribe(() => {
          console.log('Category updated successfully!');
        });
    } else {
      // tworzenie nowej kategorii, jeśli categoryId nie istnieje
      this.categoryService.createCategory(category).subscribe(() => {
        console.log('Category created successfully!');
      });
    }
  }
}
