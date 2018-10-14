import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { User, FlattenUsers } from '../users.models';

@Component({
  selector: 'app-users-listing',
  templateUrl: './users-listing.component.html',
  styleUrls: ['./users-listing.component.scss']
})
export class UsersListingComponent implements OnInit {

  private users: User[];
  private flattenUsers: FlattenUsers;
  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.getUsersList();
  }
  
  getUsersList(){
    this.usersService.getUsersList().subscribe(res => {
      this.users = res;
      this.flatUsers();
    });
  }
  
  flatUsers(){
    this.flattenUsers = this.usersService.flatUsers(this.users);
  }

  deleteUser(id: string){
    this.usersService.deleteUser(id).subscribe((res) => {
      this.getUsersList();
    });
  }

}
