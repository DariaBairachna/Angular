import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateUsersComponent }   from './components/create-users/create-users.component';

const routes: Routes = [
 { path: '', redirectTo: '/create-users', pathMatch: 'full' },
  { path: 'create-users', component: CreateUsersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
