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

    getLatestFilms(): Observable<Film[]> {
        return this.httpClient.get<Film[]>(`${this.apiUrl}?sortBy=_createdOn%20desc&pageSize=5`);
    }
}