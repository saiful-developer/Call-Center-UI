import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSize } from './input-size';

describe('InputSize', () => {
  let component: InputSize;
  let fixture: ComponentFixture<InputSize>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputSize]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputSize);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
