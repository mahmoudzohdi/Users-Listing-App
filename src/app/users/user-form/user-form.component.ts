import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../users.models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../users.service';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input() user?: User;
  @Output() formSubmitted = new EventEmitter();
  private userForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private usersService: UsersService
  ) {
  }
  
  ngOnInit() {
    this.user = this.user || new User();
    this.createForm();  
  }
  createForm() {
    this.userForm = this.fb.group({
      username: [this.user.username, Validators.required],
      name: [this.user.name, Validators.required],
      email: [this.user.email, Validators.email],
      phone: this.user.phone,
      address: this.user.address
    });
  }
  onSubmit() {
    let isNewUser: boolean = !this.user.id; // check if this form for new user
    this.user = Object.assign({}, {
      id: this.user.id || Math.floor(Math.random() * 1000000) // generate id for user if new user
    }, this.userForm.value)

    isNewUser
      ? this.usersService.addUser(this.user).subscribe( res => {
        this.formSubmitted.next();
      })
      : this.usersService.updateUser(this.user).subscribe( res => {
        this.formSubmitted.next();
      });
  }
}
