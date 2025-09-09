import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingActionBtn } from './floating-action-btn';

describe('FloatingActionBtn', () => {
  let component: FloatingActionBtn;
  let fixture: ComponentFixture<FloatingActionBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloatingActionBtn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FloatingActionBtn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
