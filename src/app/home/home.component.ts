import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MyUsers } from '../my-users.interface';
import { Env } from '../env.interface';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
myImage: string | undefined;

onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (!input.files?.length) return;

  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    const base64String = btoa(reader.result as string);
    this.uploadImage(base64String);
  };
  reader.readAsBinaryString(file);
}

uploadImage(base64String: string) {
  // Implementation to send the base64 string to your API.
  this.myImage = base64String;
}


  xmasbudget = 1000;
  count: number = 0;
  title = 'xMas Shopping';
  myContent: string = '';
  url: string = 'http://127.0.0.1:8000/api/presents';
  urlUsers: string = 'http://127.0.0.1:8000/api/users';
  config: Env = {
    production: false,
    api: 'http://127.0.0.1:8000/api',
    version: "1.0.0"
    
  }

  // my todos should also be an array of objects - using any as type for now
  // obviously we should use a model or an interface
  todos: any[] = [];
  // my users should also be an array of objects
  users: MyUsers[] = [];
  // single instance of user i aquire using ngmodel on the select in my view
  user: any;
  price: any;
  totalPrice: any;
  mail: any;

  constructor(private toastr: ToastrService) { }

  sendMail() {
    throw new Error('Method not implemented.');
    }

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
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.3.0' },
      body: JSON.stringify({
        title: this.myContent,
        owner: this.user,
        price: this.price,
        done: false,
        img: this.myImage
      })
    };

    fetch('http://localhost:3000/presents', options)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.fetchMyData();
        this.myContent = '';
        this.price = '';
        this.toastr.success('Succes', 'A new present has been added!');
      })
      .catch(err => console.error(err));
  }

  fetchMyData() {
    fetch(this.url)
      .then(response => response.json())
      .then(json => {
        this.todos = json;
        this.totalPrice = this.todos.reduce((total, todo) => total + parseFloat(todo.price), 0);
      })
  }

  fetchMyUsers() {
    fetch(this.urlUsers)
      .then(response => response.json())
      .then(json => this.users = json)
  }

  deleteTodo(id: number) {
    console.log(id)
    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.3.0' }
    };

    fetch('http://localhost:3000/presents/' + id, options)
      .then(response => response.json())
      .then(response => {
        this.fetchMyData();
        this.toastr.error('GONE!', 'The present has been deleted!');
      })
      .catch(err => console.error(err));
  }

  doneTodo(id: number) {
    const options = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.3.0' },
      body: JSON.stringify({
        'done': true
      })
    };

    fetch('http://localhost:3000/presents/' + id, options)
      .then(response => response.json())
      .then(response => {
        this.fetchMyData();
      })
      .catch(err => console.error(err));
  }

  ngOnInit() {
    
    this.fetchMyData();
    this.fetchMyUsers();
    // Retrieve count from local storage when the component initializes
    const storedCount = localStorage.getItem('count');
    this.count = storedCount !== null ? parseInt(storedCount) : 0;
  }
}