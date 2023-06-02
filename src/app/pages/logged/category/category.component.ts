import { Component, OnInit } from '@angular/core';
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

  constructor(private readonly categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getCategories();
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

  toggleSortDirection(): void {
    this.sortDirectionAsc = !this.sortDirectionAsc;
  }

  getSortIcon(): string {
    return this.sortDirectionAsc ? '▲' : '▼';
  }
}
