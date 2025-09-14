import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Outgoing } from './outgoing';

describe('Outgoing', () => {
  let component: Outgoing;
  let fixture: ComponentFixture<Outgoing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Outgoing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Outgoing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
