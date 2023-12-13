import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../shared/users.service';
import { MyUsers } from '../my-users.interface';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  constructor(private usersService: UsersService) { }

  users: MyUsers[] = [];

  ngOnInit() {
    this.usersService.getUsers().then(data => {
      this.users = data
    }).catch(error => console.log(error)
    )
  }

}
