import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Deposition } from './deposition';

describe('Deposition', () => {
  let component: Deposition;
  let fixture: ComponentFixture<Deposition>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Deposition]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Deposition);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
