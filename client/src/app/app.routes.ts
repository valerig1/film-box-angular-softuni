import { Routes } from '@angular/router';
import { NotFound } from './shared/components';

export const routes: Routes = [
	{
		path: '',
		redirectTo: '/home',
		pathMatch: 'full'
	},
	{
		path: 'home',
		loadComponent: () => import('./features/home/home').then(c => c.Home)
	},
	{
		path: 'login',
		loadComponent: () => import('./features/auth/login/login').then(c => c.Login)
	},
	{
		path: 'register',
		loadComponent: () => import('./features/auth/register/register').then(c => c.Register)
	},
	{
		path: 'library',
		loadComponent: () => import('./features/user-library/user-library').then(c => c.UserLibrary)
	},
	{
		path: 'films/create',
		loadComponent: () => import('./features/films/create-film/create-film').then(c => c.CreateFilm)
	},
	{
		path: 'films/catalog',
		loadComponent: () => import('./features/catalog/catalog').then(c => c.Catalog)
	},
	{
		path: 'films/:id/details',
		loadComponent: () => import('./features/films/film-details/film-details').then(c => c.FilmDetails)
	},
	{
		path: 'films/:id/edit',
		loadComponent: () => import('./features/films/edit-film/edit-film').then(c => c.EditFilm)
	},
	{
		path: '**',
		component: NotFound
	}
];
