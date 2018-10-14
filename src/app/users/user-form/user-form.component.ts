import { Component, OnInit, Input } from '@angular/core';
import { User } from '../users.models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input() user?: User;
  private userForm: FormGroup;
  constructor(
    private fb: FormBuilder,
  ) {
  }
  
  ngOnInit() {
    this.user = this.user || new User();
    this.createForm();  
  }
  createForm() {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      fullname: ['', Validators.required],
      email: ['', Validators.email],
      phone: '',
      address: ''
    });
  }
  onSubmit() {
    console.log(this.userForm.controls);
    console.log(this.userForm.value);
  }
}
