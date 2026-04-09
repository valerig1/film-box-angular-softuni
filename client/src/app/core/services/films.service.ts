import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Film } from "../../models";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})

export class FilmsService {
    private apiUrl = 'http://localhost:3030/data/films';
    private authService = inject(AuthService);

    constructor(private httpClient: HttpClient) {}

    private getAuthToken(): string {
        const token = this.authService.getAccessToken();
        if (!token) {
            throw new Error("User not authenticated");
        }
        return token;
    }

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
        title: string, year: number, genre: string, img: string, description: string): Observable<Film> {
        const token = this.getAuthToken();

        return this.httpClient.post<Film>(
            this.apiUrl,
            { title, year, genre, img, description },
            { headers: { 'X-Authorization': token } });
    }

    updateFilm(
        id: string, 
        title: string, 
        year: number, 
        genre: string, 
        img: string, 
        description: string): Observable<Film> {
        
        const token = this.getAuthToken();
        
        return this.httpClient.put<Film>(
            `${this.apiUrl}/${id}`,
            { title, year, genre, img, description },
            { headers: { 'X-Authorization': token } });
    }

    deleteFilm(id: string): Observable<Film> {
        const token = this.getAuthToken();

        return this.httpClient.delete<Film>(`${this.apiUrl}/${id}`, { headers: { 'X-Authorization': token } });
    }
}