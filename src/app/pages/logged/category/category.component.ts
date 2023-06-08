import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
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
          console.log('categories', categories);
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
    console.log('categoryid', categotyId);
    this.router.navigate(['/category/add', categotyId]);
  }
  onDelete(categotyId: number): void {
    console.log('categoryid', categotyId);
    this.categoryService.deleteCategory(categotyId).subscribe();
  }
}
