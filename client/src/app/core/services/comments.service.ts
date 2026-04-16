import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Comment } from "../../models";

@Injectable({
	providedIn: 'root'
})

export class CommentsService {
	private apiUrl = 'http://localhost:3030/data/comments';

	constructor(private httpClient: HttpClient) { }

	getCommentsByFilm(filmId: string): Observable<Comment[]> {
		const query = encodeURIComponent(`filmId="${filmId}"`);

		return this.httpClient.get<Comment[]>(
			`${this.apiUrl}?where=${query}&sortBy=_createdOn%20desc`
		);
	}

	addComment(filmId: string, content: string, username: string): Observable<Comment> {
		return this.httpClient.post<Comment>(this.apiUrl, {
			filmId,
			content,
			username
		});
	}
}