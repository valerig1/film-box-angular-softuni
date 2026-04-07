import { Component } from '@angular/core';
import { LatestFilmsBoard } from '../films';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [LatestFilmsBoard, RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
