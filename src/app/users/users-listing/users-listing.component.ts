import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../users.models';

@Component({
  selector: 'app-users-listing',
  templateUrl: './users-listing.component.html',
  styleUrls: ['./users-listing.component.scss']
})
export class UsersListingComponent implements OnInit {

  private users: User[];
  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getUsersList().subscribe(res => {
      this.users = res;
    })
  }

}
