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

  // make an array of objects with some fake users so that we can simulate a fetch call
  users: any[] = [{
    id: 1,
    username: 'username1',
    name: 'Frank'
  },
  {
    id: 2,
    username: 'username2',
    name: 'Harry'
  },
  {
    id: 3,
    username: 'username3',
    name: 'Guido'
  },
  {
    id: 4,
    username: 'username4',
    name: 'Sally'
  },
  {
    id: 5,
    username: 'username5',
    name: 'Jack'
  }
  ];

  // virtual array of users uncluded in my fake many2many column
  many2many: any[] = [1, 3, 2, 8];

  // this is the array where we will put our details in...
  many2manyUsers!: any[];

  /* The getMany2ManyUsers method is used to map over the many2many array and find the corresponding user objects in the users array using the Array.prototype.find method. 
  
  The resulting array of users is then assigned to the many2manyUsers property of the component.
  
  The filter method is used to remove any undefined entries that might occur if a user ID in the many2many array does not correspond to any user in the users array. */

  getMany2ManyUsers(): void {
    // in theory you should call this.usersService.getUsers() and assign the results to the many2many array
    this.many2manyUsers = this.many2many.map(userId => this.users.find(user => user.id === userId))
      .filter(user => user !== undefined); // This will remove any undefined entries if a user is not found
  }


  ngOnInit() {
    this.getMany2ManyUsers();
  }

}
