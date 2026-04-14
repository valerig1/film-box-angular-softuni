import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Like } from "../../models";

@Injectable({ providedIn: 'root' })
export class LikesService {
	private apiUrl = 'http://localhost:3030/data/likes';

	constructor(private httpClient: HttpClient) { }

	getLikesCount(filmId: string): Observable<number> {
		const query = encodeURIComponent(`filmId="${filmId}"`);

		return this.httpClient.get<number>(
			`${this.apiUrl}?where=${query}&distinct=_ownerId&count=true`
			// `${this.apiUrl}?where=filmId%3D%22${filmId}%22&distinct=_ownerId&count=true`
		);
	}

	getUserLike(filmId: string, userId: string): Observable<Like[]> {
		const query = encodeURIComponent(
			`filmId="${filmId}" and _ownerId="${userId}"`
		);

		return this.httpClient.get<Like[]>(
			`${this.apiUrl}?where=${query}`
			// `${this.apiUrl}?where=filmId%3D%22${filmId}%22%20and%20_ownerId%3D%22${userId}%22`
		);
	}

	getUserLikes(userId: string): Observable<Like[]> {
		const query = encodeURIComponent(`_ownerId="${userId}"`);

		return this.httpClient.get<Like[]>(
			`${this.apiUrl}?where=${query}&sortBy=_createdOn%20desc&pageSize=5`
			// `${this.apiUrl}?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc&pageSize=5`
		);
	}

	like(filmId: string): Observable<Like> {
		return this.httpClient.post<Like>(this.apiUrl, { filmId });
	}

	unlike(likeId: string): Observable<void> {
		return this.httpClient.delete<void>(`${this.apiUrl}/${likeId}`);
	}
}