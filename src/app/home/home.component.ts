import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  xmasbudget = 20000;
  count:number = 0;
  title = 'xMas Shopping';
  myContent:string = '';
  url:string = 'http://localhost:3000/presents';
  urlUsers:string = 'http://localhost:3000/users';

  // my todos should also be an array of objects - using any as type for now
  // obviously we should use a model or an interface
  todos:any[] = [];
  // my users should also be an array of objects
  users:any[] = [];

  // single instance of user i aquire using ngmodel on the select in my view
  user: any;

  increaseCount() {
    this.count++;
    localStorage.setItem('count', this.count.toString());
  }

  decreaseCount() {
    this.count--;
    localStorage.setItem('count', this.count.toString());
    }

  postData() {
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.3.0'},
      body: JSON.stringify({
        'title': this.myContent,
        'owner': this.user,
        'done': false
      })
    };
    
    fetch('http://localhost:3000/presents', options)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.fetchMyData();
        this.myContent = '';
      })
      .catch(err => console.error(err));

  }

  fetchMyData() {
    fetch(this.url)
      .then(response => response.json())
      .then(json => this.todos = json)
  }

  fetchMyUsers() {
    fetch(this.urlUsers)
      .then(response => response.json())
      .then(json => this.users = json)
  }
  
  ngOnInit() {
    this.fetchMyData();
    this.fetchMyUsers();
   // Retrieve count from local storage when the component initializes
   const storedCount = localStorage.getItem('count');
   this.count = storedCount !== null ? parseInt(storedCount) : 0;
  }

}
