import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrunkStatusLive } from './trunk-status-live';

describe('TrunkStatusLive', () => {
  let component: TrunkStatusLive;
  let fixture: ComponentFixture<TrunkStatusLive>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrunkStatusLive]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrunkStatusLive);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
