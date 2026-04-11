import { Injectable, signal } from "@angular/core";
import { User } from "../../models";
import { Observable, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private apiUrl = 'http://localhost:3030/users';
    private _isLoggedIn = signal<boolean>(false);
    private _currentUser = signal<User | null>(null);

    public isLoggedIn = this._isLoggedIn.asReadonly();
    public currentUser = this._currentUser.asReadonly();

    constructor(private httpClient: HttpClient) {
        const savedUser = localStorage.getItem('currentUser');

        if (savedUser) {
            const user = JSON.parse(savedUser);
            this._currentUser.set(user);
            this._isLoggedIn.set(true);
        }
    }

    login(email: string, password: string): Observable<User> {
        return this.httpClient.post<User>(`${this.apiUrl}/login`, { email, password }, {
        }).pipe(
            tap(user => {
                this._currentUser.set(user);
                this._isLoggedIn.set(true);
                localStorage.setItem('currentUser', JSON.stringify(user));
            }))
    }

    register(username: string, email: string, password: string, rePassword: string): Observable<User> {
        return this.httpClient.post<User>(`${this.apiUrl}/register`, { username, email, password, rePassword }, {
        }).pipe(
            tap(user => {
                this._currentUser.set(user);
                this._isLoggedIn.set(true);
                localStorage.setItem('currentUser', JSON.stringify(user));
            }))
    }

    logout(): Observable<void> {
        return this.httpClient.get<void>(`${this.apiUrl}/logout`).pipe(
            tap(() => {
                this._currentUser.set(null);
                this._isLoggedIn.set(false);
                localStorage.removeItem('currentUser');
            })
        );
    }

    getAccessToken(): string | null {
        const savedUser = localStorage.getItem('currentUser');

        if (savedUser) {
            const user = JSON.parse(savedUser);
            return user?.accessToken || null;
        }

        return null;
    }

    getCurrentUserId(): string | null {
        return this._currentUser()?._id || null;
    }
}