import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, tap } from 'rxjs';
import {
  Category,
  CategoryService,
} from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styles: [],
})
export class CategoryComponent implements OnInit {
  categories!: Category[];
  sortDirectionAsc: boolean = true;

  constructor(
    private readonly categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.categoryService.categories$.subscribe((categories) => {
      this.categories = categories;
    });
  }

  getCategories(): void {
    this.categoryService
      .getCategoryList()
      .pipe(
        tap((categories) => {
          this.categories = categories;
        })
      )
      .subscribe();
  }

  sortCategories(sortBy: string): void {
    this.categories.sort((a, b) => {
      const valueA = String(a[sortBy]).toLowerCase();
      const valueB = String(b[sortBy]).toLowerCase();
      const compareResult = valueA.localeCompare(valueB);
      return this.sortDirectionAsc ? compareResult : -compareResult;
    });
  }
  get isAddCategoryRoute() {
    return this.router.url.includes('/category/add');
  }

  toggleSortDirection(): void {
    this.sortDirectionAsc = !this.sortDirectionAsc;
  }

  getSortIcon(): string {
    return this.sortDirectionAsc ? '▲' : '▼';
  }
  onUpdate(categotyId: number): void {
    this.router.navigate(['/category/add', categotyId]);
  }
  onDelete(categotyId: number): void {
    this.categoryService
      .deleteCategory(categotyId)
      .pipe(
        tap(() => {}),
        catchError((error: HttpErrorResponse) => {
          alert(error.error.error);
          throw error;
        })
      )
      .subscribe();
  }

  onPreview(categoryId: number): void {
    this.router.navigate(['/categoryDetails', categoryId]);
  }
}
