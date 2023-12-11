import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  count:number = 0;
  title = 'xMas Shopping';
  myContent:string = '';
  url:string = 'http://localhost:3000/presents';
  todos:any[] = [];
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
  
  ngOnInit() {
    this.fetchMyData();
   // Retrieve count from local storage when the component initializes
   const storedCount = localStorage.getItem('count');
   this.count = storedCount !== null ? parseInt(storedCount) : 0;
  }

}
