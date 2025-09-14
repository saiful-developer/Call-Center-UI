import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Abandon } from './abandon';

describe('Abandon', () => {
  let component: Abandon;
  let fixture: ComponentFixture<Abandon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Abandon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Abandon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
