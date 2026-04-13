import { Component, Input } from '@angular/core';
import { Film } from '../../../models';
import { RouterLink } from '@angular/router';
import { CapitalizeTextPipe, SliceTextPipe } from '../../../shared/pipes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-film-item',
  imports: [RouterLink, CommonModule, SliceTextPipe, CapitalizeTextPipe],
  templateUrl: './film-item.html',
  styleUrl: './film-item.scss',
})
export class FilmItem {
  @Input() film!: Film;
}
