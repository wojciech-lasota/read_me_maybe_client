import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { BookListComponent } from './book-list/book-list.component';
import { CategoryComponent } from './category/category.component';
import { AddBookComponent } from './book-list/add-book/add-book.component';
import { PreviewComponent } from './prewiev/prewiev.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'book-list',
        component: BookListComponent,
        children: [
          {
            path: 'add',
            component: AddBookComponent,
          },
          {
            path: 'add/:id',
            component: AddBookComponent,
          },
        ],
      },
      {
        path: 'preview/:id',
        component: PreviewComponent,
      },
      {
        path: 'category',
        component: CategoryComponent,
        children: [
          {
            path: 'add',
            component: AddCategoryComponent,
          },
          {
            path: 'add/:id',
            component: AddCategoryComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoggedRoutingModule {}
