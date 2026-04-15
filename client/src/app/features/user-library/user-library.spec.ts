import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLibrary } from './user-library';

describe('UserLibrary', () => {
  let component: UserLibrary;
  let fixture: ComponentFixture<UserLibrary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserLibrary],
    }).compileComponents();

    fixture = TestBed.createComponent(UserLibrary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
