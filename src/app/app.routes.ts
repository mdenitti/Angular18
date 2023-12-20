// app.routes.ts
import { Routes } from  '@angular/router';
import { HomeComponent } from  './home/home.component';
import { AboutComponent } from  './about/about.component';
import { ContactComponent } from  './contact/contact.component';

// import auth guard and login component
import { authGuard } from  './auth.guard';
import { LoginComponent } from  './login/login.component';
import { Component } from '@angular/core';
import { DetailsComponent } from './details/details.component';
import { RegisterComponent } from './register/register.component';

// Also create a login route and secure with [authGuard]!
export  const  routes:  Routes  = [
	{
	path: '',
	redirectTo: 'home',
	pathMatch: 'full'
	},
	{
	path: 'home',
	component: HomeComponent
	},
	{
	path: 'about',
	component: AboutComponent
	},
	{
	path: 'contact',
	canActivate: [authGuard],
	component: ContactComponent
	},
	{
	path: 'login',
	component: LoginComponent
	},
	{
	path: 'details',
	component: DetailsComponent
	},
	{
	path: 'details/:id',
	component: DetailsComponent
	},
	{
	path: 'register',
	component: RegisterComponent
	}

];