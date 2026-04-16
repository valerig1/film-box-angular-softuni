import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmComments } from './film-comments';

describe('FilmComments', () => {
  let component: FilmComments;
  let fixture: ComponentFixture<FilmComments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmComments],
    }).compileComponents();

    fixture = TestBed.createComponent(FilmComments);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
