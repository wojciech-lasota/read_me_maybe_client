import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoggedRoutingModule } from './logged-routing.module';
import { MainComponent } from './main.component';
import { BookListComponent } from './book-list/book-list.component';
import { CategoryComponent } from './category/category.component';
import { AddBookComponent } from './book-list/add-book/add-book.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PreviewComponent } from './prewiev/prewiev.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';

@NgModule({
  declarations: [
    MainComponent,
    BookListComponent,
    CategoryComponent,
    AddBookComponent,
    PreviewComponent,
    AddCategoryComponent,
  ],
  imports: [CommonModule, LoggedRoutingModule, ReactiveFormsModule],
})
export class LoggedModule {}
