import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifySearch } from './spotify-search';

describe('SpotifySearch', () => {
  let component: SpotifySearch;
  let fixture: ComponentFixture<SpotifySearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpotifySearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotifySearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
