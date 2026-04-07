import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Film } from '../../../models';
import { FilmsService } from '../../../core/services';
import { FilmItem } from '../film-item/film-item';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-latest-films-board',
  imports: [FilmItem, CommonModule],
  templateUrl: './latest-films-board.html',
  styleUrl: './latest-films-board.scss',
})
export class LatestFilmsBoard implements OnInit {
  films$!: Observable<Film[]>

  constructor(private filmsService: FilmsService) { }

  ngOnInit(): void {
    this.films$ = this.filmsService.getLatestFilms();
  }
}
