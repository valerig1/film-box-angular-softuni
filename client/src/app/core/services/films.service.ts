import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Film } from "../../models";

@Injectable({
    providedIn: 'root'
})

export class FilmsService {
    private apiUrl = 'http://localhost:3030/data/films';

    constructor(private httpClient: HttpClient) {}

    getFilms(): Observable<Film[]> {
        return this.httpClient.get<Film[]>(this.apiUrl);
    }

    getFilmById(id: string): Observable<Film> {
        return this.httpClient.get<Film>(`${this.apiUrl}/${id}`);
    }

    getLatestFilms(): Observable<Film[]> {
        return this.httpClient.get<Film[]>(`${this.apiUrl}?sortBy=_createdOn%20desc&pageSize=5`);
    }

    createFilm(
        title: string, 
        year: number, 
        genre: string, 
        img: string, 
        description: string): Observable<Film> {

        return this.httpClient.post<Film>(
            this.apiUrl,
            { title, year, genre, img, description });
    }

    updateFilm(
        id: string, 
        title: string, 
        year: number, 
        genre: string, 
        img: string, 
        description: string): Observable<Film> {
                
        return this.httpClient.put<Film>(
            `${this.apiUrl}/${id}`,
            { title, year, genre, img, description });
    }

    deleteFilm(id: string): Observable<Film> {
        return this.httpClient.delete<Film>(`${this.apiUrl}/${id}`);
    }
}