import { Component } from '@angular/core';
import { UsersService } from '../shared/users.service';
import { MyUsers } from '../my-users.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  constructor(private usersService: UsersService) { }

  users: MyUsers[] = []
  apiurl = this.usersService.url

  fieldsArray = ['', '']; // Initialize with two fields... it's up to you to add more

  addField() {
    // Add a new field
    this.fieldsArray.push('');
  }

  submitForm() {
    // making use of the destructor again ;) yay
    const values = [...this.fieldsArray];
    console.log(values);

    // clear the fields;
    this.fieldsArray = ['', ''];

    alert(values.join('\n'));
  }

  ngOnInit() {
    this.usersService.getUsers().then(data => {
      this.users = data
    }).catch(error => console.log(error)
    )
  }

}
