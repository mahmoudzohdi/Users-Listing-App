import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListingComponent } from './users-listing/users-listing.component';

const routes: Routes = [
  { path: '', component: UsersListingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
