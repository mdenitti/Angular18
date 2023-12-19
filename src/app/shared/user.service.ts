import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';


@Injectable({
	providedIn: 'root'
})

export class UserService {
	// empty salt for demo purposes - should be generated randomly in production
	salt = '';

	constructor() { }
	// Dummy users wich we can replace with actual api called users
	// https://emn178.github.io/online-tools/sha256.html
	users = [
		{ id: 1, username: 'johndoe', password: '280d44ab1e9f79b5cce2dd4f58f5fe91f0fbacdac9f7447dffc318ceb79f2d02' },
		{ id: 2, username: 'janedoe', password: '280d44ab1e9f79b5cce2dd4f58f5fe91f0fbacdac9f7447dffc318ceb79f2d02' },
	];

	// Returns all users

	getUsers() {
		// just for demo purposes - here we would perform an api call
		return this.users;
	}

	// Checks user credentials and returns a valid token or null
	async login(username: string, password: string) {
		let user = this.users.find((u) => u.username === username);
		if (!user || CryptoJS.SHA256(password + this.salt).toString() !== user.password) {
			return null;
		}
		return user.id.toString();
	}
}