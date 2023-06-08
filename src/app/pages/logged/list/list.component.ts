import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  categories: any[] = [];

  constructor(private readonly categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService
      .getCategoryWithBooks()
      .pipe(
        tap((categories) => {
          console.log('categories', categories);
          this.categories = categories;
        })
      )
      .subscribe();
  }
}
