import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoggedRoutingModule } from './logged-routing.module';
import { MainComponent } from './main.component';
import { BookListComponent } from './book-list/book-list.component';
import { CategoryComponent } from './category/category.component';

@NgModule({
  declarations: [MainComponent, BookListComponent, CategoryComponent],
  imports: [CommonModule, LoggedRoutingModule],
})
export class LoggedModule {}
