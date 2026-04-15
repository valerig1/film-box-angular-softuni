import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedFilms } from './liked-films';

describe('LikedFilms', () => {
  let component: LikedFilms;
  let fixture: ComponentFixture<LikedFilms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikedFilms],
    }).compileComponents();

    fixture = TestBed.createComponent(LikedFilms);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
