import { Component, signal } from '@angular/core';
import { MyUploads } from './components/my-uploads/my-uploads';
import { LikedFilms } from './components/liked-films/liked-films';

@Component({
  selector: 'app-user-library',
  imports: [MyUploads, LikedFilms],
  templateUrl: './user-library.html',
  styleUrl: './user-library.scss',
})
export class UserLibrary {
  activeTab = signal<'uploads' | 'likes'>('uploads');

  setTab(tab: 'uploads' | 'likes') {
    this.activeTab.set(tab);
  }
}
