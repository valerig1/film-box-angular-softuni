import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteFilmsBoard } from './favorite-films-board';

describe('FavoriteFilmsBoard', () => {
  let component: FavoriteFilmsBoard;
  let fixture: ComponentFixture<FavoriteFilmsBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteFilmsBoard],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoriteFilmsBoard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
