import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedMainComponent } from './logged-main.component';
import { IsAuthenticatedGuard } from './shared/guards/is-authenticated.guard';
import { UnLoggedMainComponent } from './un-logged-main.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: LoggedMainComponent,
  //   canActivate: [IsAuthenticatedGuard],
  //   children: [],
  // },
  {
    path: '',
    component: UnLoggedMainComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/un-logged/un-logged.module').then(
            (m) => m.UnLoggedModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
