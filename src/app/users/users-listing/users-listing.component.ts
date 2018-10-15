import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { User, FlattenUsers } from '../users.models';

@Component({
  selector: 'app-users-listing',
  templateUrl: './users-listing.component.html',
  styleUrls: ['./users-listing.component.scss']
})
export class UsersListingComponent implements OnInit {

  private objectKeys = Object.keys;
  private users: User[];
  private selectedUsersIDs = {};
  private flattenUsers: FlattenUsers;
  private userForEdit: User = null;
  private openUserForm: boolean = false;
  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.getUsersList();
  }
  change(e){
    let isChecked: boolean = e.target.checked;
    switch(isChecked){
      case true:{
        this.selectedUsersIDs[e.target.value] = true;
        break;
      }
      case false:{
        delete this.selectedUsersIDs[e.target.value];
        break;
      }
      default:
        break;
    }

  }
  getUsersList(){
    this.selectedUsersIDs = {};
    this.usersService.getUsersList().subscribe(res => {
      this.users = res;
      this.flatUsers();
    });
  }
  
  flatUsers(){
    this.flattenUsers = this.usersService.flatUsers(this.users);
  }

  openEditForm(id?: string){
    this.openUserForm = true;
    id && (this.userForEdit = this.flattenUsers[id]);
  }
  closeEditForm(){
    this.openUserForm = false;
    this.userForEdit = null;
  }

  deleteSelectedUsers(){
    let ids: string[] = this.objectKeys(this.selectedUsersIDs);
    this.deleteUser(ids);
  }
  deleteUser(id: string | string[]){
    if(Array.isArray(id)){
      id.map((currentID, index) => {
        setTimeout(()=>{
          this.usersService.deleteUser(currentID).subscribe((res) => {
            console.log(currentID);
            index == id.length -1 && this.getUsersList();
            index == id.length -1 && console.log('finish');
          });
        }, 1000)
      })
    }else{
      this.usersService.deleteUser(id).subscribe((res) => {
        this.getUsersList();
      });
    }
  }

  listUpdated(){
    this.closeEditForm();
    this.getUsersList();
  }

}
