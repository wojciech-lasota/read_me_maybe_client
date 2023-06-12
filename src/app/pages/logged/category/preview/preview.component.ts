import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { CategoryService } from 'src/app/shared/services/category.service';
interface ICategoryById {
  CategoryName: string;
  CategoryID: number;
}

@Component({
  selector: 'app-preview',
  template: `<div class="d-flex justify-content-start mt-3"></div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Category name</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="m-1">{{ category?.CategoryName }}</td>
        </tr>
      </tbody>
    </table> `,
})
export class PreviewComponent implements OnInit {
  category!: ICategoryById;
  constructor(
    private readonly categoryService: CategoryService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.categoryService
      .getCategoryById(id)
      .pipe(
        tap((category) => {
          this.category = category;
        })
      )
      .subscribe();
  }
}
