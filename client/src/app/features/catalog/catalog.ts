import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FilmsService } from '../../core/services';
import { Film } from '../../models';
import { FilmItem } from '../films';
import { Subscription } from 'rxjs';

type SortOption = 'recent' | 'oldest' | 'year-new' | 'year-old';
type SearchMode = 'title' | 'genre';

@Component({
  selector: 'app-catalog',
  imports: [FilmItem],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
})

export class Catalog implements OnInit, OnDestroy {
  private filmsService = inject(FilmsService);

  private subscription: Subscription | null = null;

  films = signal<Film[]>([]);
  sort = signal<SortOption>('recent');

  search = signal<string>('');
  searchMode = signal<SearchMode>('title');

  ngOnInit(): void {
    this.subscription = this.filmsService.getFilms().subscribe({
      next: (films) => {
        this.films.set(films);
      },
      error: () => {
        this.films.set([]);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  get filteredAndSortedFilms(): Film[] {
    const films = [...this.films()];
    const searchValue = this.search().toLowerCase().trim();

    let result = films;

    if (searchValue) {
      if (this.searchMode() === 'title') {
        result = result.filter(f =>
          f.title.toLowerCase().includes(searchValue)
        );
      } else {
        result = result.filter(f =>
          f.genre.toLowerCase().startsWith(searchValue)
        );
      }
    }

    switch (this.sort()) {
      case 'recent':
        return result.sort((a, b) => b._createdOn - a._createdOn);

      case 'oldest':
        return result.sort((a, b) => a._createdOn - b._createdOn);

      case 'year-new':
        return result.sort((a, b) => b.year - a.year);

      case 'year-old':
        return result.sort((a, b) => a.year - b.year);

      default:
        return result;
    }
  }

  onSortChange(value: string): void {
    this.sort.set(value as SortOption);
  }

  onSearchChange(value: string): void {
    this.search.set(value);
  }

  onSearchModeChange(value: string): void {
    this.searchMode.set(value as SearchMode);
  }
}
