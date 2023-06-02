import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnLoggedRoutingModule } from './un-logged-routing.module';
import { MainComponent } from './main.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [MainComponent, RegisterComponent, LoginComponent],
  imports: [CommonModule, UnLoggedRoutingModule, ReactiveFormsModule],
})
export class UnLoggedModule {}
