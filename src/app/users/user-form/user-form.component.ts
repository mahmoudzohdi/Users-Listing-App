import { Component, OnInit, Input } from '@angular/core';
import { User } from '../users.models';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input() user?: User;
  constructor() { }
  
  ngOnInit() {
    this.user = this.user || new User();
    console.log(this.user.address);
  }

}
