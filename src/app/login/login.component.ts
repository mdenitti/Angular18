// src/app/login/login.component.ts
import { Component } from  '@angular/core';
import { UserService } from  '../shared/user.service';
import { FormsModule } from  '@angular/forms';
import { ToastrService } from 'ngx-toastr'

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [FormsModule],
	templateUrl: './login.component.html',
	styleUrl: './login.component.css'
})

export  class  LoginComponent {
	username!:  string;
	password!:  string;
	constructor(private  userService:  UserService, private toastr: ToastrService) { }

	// Let's go wild and write some async sh!t
	async onSubmit() {
		const  token  =  await this.userService.login(this.username, this.password);
		if (token) {
			// Store token in local storage
			localStorage.setItem('token', token);
      this.toastr.success('You now have access to the protected component', 'Yay');
			// Redirect to protected component
			// ...
			} else {
        this.toastr.error('Wrong credentials', 'Not Yay');
			
			}
		}

// logout method
	logout() {
	localStorage.removeItem('token');
  this.toastr.warning('Logged out successfully', 'Logout');
	}
}