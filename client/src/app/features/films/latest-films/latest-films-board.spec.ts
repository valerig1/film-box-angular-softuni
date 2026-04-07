import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestFilmsBoard } from './latest-films-board';

describe('LatestFilmsBoard', () => {
  let component: LatestFilmsBoard;
  let fixture: ComponentFixture<LatestFilmsBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatestFilmsBoard],
    }).compileComponents();

    fixture = TestBed.createComponent(LatestFilmsBoard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
