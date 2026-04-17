import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin, Observable, of } from "rxjs";
import { Film } from "../../models";

@Injectable({
	providedIn: 'root'
})

export class FilmsService {
	private apiUrl = 'http://localhost:3030/data/films';

	constructor(private httpClient: HttpClient) { }

	getFilms(): Observable<Film[]> {
		return this.httpClient.get<Film[]>(this.apiUrl);
	}

	getFilmById(id: string): Observable<Film> {
		return this.httpClient.get<Film>(`${this.apiUrl}/${id}`);
	}

	getFilmsByIds(ids: string[]): Observable<Film[]> {
		if (ids.length === 0) {
			return of([]);
		}

		const query = encodeURIComponent(
			`_id IN (${ids.map(id => `"${id}"`).join(',')})`
		);

		return this.httpClient.get<Film[]>(`${this.apiUrl}?where=${query}`);
	}

	getLatestFilms(): Observable<Film[]> {
		return this.httpClient.get<Film[]>(`${this.apiUrl}?sortBy=_createdOn%20desc&pageSize=5`);
	}

	createFilm(
		title: string,
		year: number,
		genre: string,
		img: string,
		description: string,
		ownerUsername: string): Observable<Film> {

		return this.httpClient.post<Film>(
			this.apiUrl,
			{ title, year, genre, img, description, _ownerUsername: ownerUsername });
	}

	updateFilm(
		id: string,
		title: string,
		year: number,
		genre: string,
		img: string,
		description: string,
		ownerUsername: string): Observable<Film> {

		return this.httpClient.put<Film>(
			`${this.apiUrl}/${id}`,
			{ title, year, genre, img, description, _ownerUsername: ownerUsername });
	}

	deleteFilm(id: string): Observable<void> {
		return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
	}
}