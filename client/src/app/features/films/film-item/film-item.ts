import { Component, Input } from '@angular/core';
import { Film } from '../../../models';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-film-item',
  imports: [RouterLink],
  templateUrl: './film-item.html',
  styleUrl: './film-item.scss',
})
export class FilmItem {
  @Input() film!: Film;
}
