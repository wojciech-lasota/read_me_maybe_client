import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { BookListComponent } from './book-list/book-list.component';
import { CategoryComponent } from './category/category.component';
import { AddBookComponent } from './book-list/add-book/add-book.component';
import { PrewievComponent } from './prewiev/prewiev.component';

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
        component: PrewievComponent,
      },
      {
        path: 'category',
        component: CategoryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoggedRoutingModule {}
