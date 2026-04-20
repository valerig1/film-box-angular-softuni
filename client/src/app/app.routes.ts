import { Routes } from '@angular/router';
import { NotFound } from './shared/components';
import { authGuard, guestGuard, ownerGuard } from './core/guards';

export const routes: Routes = [
	{
		path: '',
		redirectTo: '/home',
		pathMatch: 'full'
	},
	// Public routes
	{
		path: 'home',
		loadComponent: () => import('./features/home/home').then(c => c.Home)
	},
	{
		path: 'films/catalog',
		loadComponent: () => import('./features/catalog/catalog').then(c => c.Catalog)
	},
	{
		path: 'films/:id/details',
		loadComponent: () => import('./features/films/film-details/film-details').then(c => c.FilmDetails)
	},
	// Guest-only routes
	{
		path: 'login',
		canActivate: [guestGuard],
		loadComponent: () => import('./features/auth/login/login').then(c => c.Login)
	},
	{
		path: 'register',
		canActivate: [guestGuard],
		loadComponent: () => import('./features/auth/register/register').then(c => c.Register)
	},
	// Authenticated routes
	{
		path: 'library',
		canActivate: [authGuard],
		loadComponent: () => import('./features/user-library/user-library').then(c => c.UserLibrary)
	},
	{
		path: 'films/create',
		canActivate: [authGuard],
		loadComponent: () => import('./features/films/create-film/create-film').then(c => c.CreateFilm)
	},
	{
		path: 'films/:id/edit',
		canActivate: [authGuard, ownerGuard ],
		loadComponent: () => import('./features/films/edit-film/edit-film').then(c => c.EditFilm)
	},
	// Fallback
	{
		path: '**',
		component: NotFound
	}
];
