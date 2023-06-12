import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  categories: any[] = [];

  constructor(
    private readonly categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryService
      .getCategoryWithBooks()
      .pipe(
        tap((categories) => {
          this.categories = categories;
        })
      )
      .subscribe();
  }
  onPreview(id: number): void {
    this.router.navigate(['/categoryDetails', id]);
  }
}
