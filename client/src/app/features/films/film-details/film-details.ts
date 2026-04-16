import { Component, inject, OnInit, ChangeDetectorRef, OnDestroy, signal } from '@angular/core';
import { AuthService, FilmsService, LikesService } from '../../../core/services';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { Film, Like } from '../../../models';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CapitalizeTextPipe } from '../../../shared/pipes';
import { FilmComments } from '../film-comments/film-comments';
import { MatIcon } from '@angular/material/icon';

@Component({
	selector: 'app-film-details',
	imports: [RouterModule, RouterLink, CommonModule, FilmComments, CapitalizeTextPipe, MatIcon],
	templateUrl: './film-details.html',
	styleUrl: './film-details.scss',
})

export class FilmDetails implements OnInit, OnDestroy {
	protected filmsService = inject(FilmsService);
	protected authService = inject(AuthService);
	protected likesService = inject(LikesService);

	private route = inject(ActivatedRoute);
	private router = inject(Router);
	private changeDetectorRef = inject(ChangeDetectorRef);

	private subscriptions: Subscription[] = [];
	private filmId: string | null = null;

	film: Film | null = null;
	isLoading: boolean = true;

	readonly isLoggedIn = this.authService.isLoggedIn;
	readonly currentUser = this.authService.currentUser;

	likesCount = signal<number>(0);
	hasLiked = signal<boolean>(false);
	isProcessingLike = signal(false);
	likeId: string | null = null;

	ngOnInit(): void {
		this.filmId = this.getFilmIdFromRoute();
		const userId = this.authService.getCurrentUserId();

		if (!this.filmId) {
			return;
		}

		this.subscriptions.push(
			this.filmsService.getFilmById(this.filmId).subscribe({
				next: (film) => {
					this.film = film;
					this.isLoading = false;
					this.changeDetectorRef.detectChanges();
				},
				error: () => {
					this.isLoading = false;
				}
			})
		);

		this.subscriptions.push(
			this.likesService.getLikesCount(this.filmId).subscribe({
				next: (count) => {
					this.likesCount.set(count);
				},
				error: () => {
					this.likesCount.set(0);
				}
			})
		);

		if (userId) {
			this.subscriptions.push(
				this.likesService.getUserLike(this.filmId, userId).subscribe({
					next: (likes: Like[]) => {
						if (likes.length > 0) {
							this.hasLiked.set(true);
							this.likeId = likes[0]._id;
						}
					},
					error: () => {
						this.hasLiked.set(false);
					}
				})
			);
		}
	}

	likeHandler() {
		if (!this.filmId || this.hasLiked() || this.isProcessingLike()) {
			return;
		}

		this.isProcessingLike.set(true);

		this.subscriptions.push(
			this.likesService.like(this.filmId).subscribe({
				next: (like: Like) => {
					this.hasLiked.set(true);
					this.likeId = like._id;
					this.likesCount.update(c => c + 1);
					this.isProcessingLike.set(false);
				},
				error: () => {
					this.isProcessingLike.set(false);
				}
			})
		);
	}

	unlikeHandler() {
		if (!this.likeId || this.isProcessingLike()) {
			return;
		}

		this.isProcessingLike.set(true);

		this.subscriptions.push(
			this.likesService.unlike(this.likeId).subscribe({
				next: () => {
					this.hasLiked.set(false);
					this.likeId = null;
					this.likesCount.update(c => c - 1);
					this.isProcessingLike.set(false);
				},
				error: () => {
					this.isProcessingLike.set(false);
				}
			})
		);
	}

	deleteFilmHandler(): void {
		const isConfirmed = confirm(`Are you sure you want to delete this film: ${this.film?.title}`);

		if (!isConfirmed) {
			return;
		}

		if (this.filmId) {
			this.subscriptions.push(
				this.filmsService.deleteFilm(this.filmId).subscribe({
					next: () => {
						this.router.navigate(['/home']);
					}
				})
			)
		}
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(sub => sub.unsubscribe());
	}

	private getFilmIdFromRoute(): string | null {
		return this.route.snapshot.paramMap.get('id');
	}
}
