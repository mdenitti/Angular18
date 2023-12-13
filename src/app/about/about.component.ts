import { Component } from '@angular/core';
import { UsersService } from '../shared/users.service';
import { MyUsers } from '../my-users.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  constructor(private usersService: UsersService) { }

users: MyUsers[] = []  
apiurl = this.usersService.url

ngOnInit() {
  this.usersService.getUsers().then(data => {
    this.users = data
  }).catch(error => console.log(error)
  )
}

}
