import { Injectable } from '@angular/core';
import { baseURL } from '../../config';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User, FlattenUsers } from './users.models';

@Injectable()
export class UsersService {
  private usersAPI: string = `${baseURL}users`;
  constructor(private http: Http) { }
  
  getUsersList(): Observable<User[]> {
    return this.http.get(this.usersAPI).map(response => response.json() as User[]);
  }
  
  flatUsers(users: User[]): FlattenUsers{
    return users.reduce((flattenUsers: FlattenUsers, user) => {
      flattenUsers[user.id] = user;
      return flattenUsers;
    }, {})
  }

  deleteUser(id: string){
    return this.http.delete(`${this.usersAPI}/${id}`);
  }

  updateUser(user: User){
    return this.http.put(`${this.usersAPI}/${user.id}`, user).map( res => res.json())
  }
  addUser(user: User){
    return this.http.post(`${this.usersAPI}`, user).map( res => res.json())
  }
}
