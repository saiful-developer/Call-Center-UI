import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Select2 } from './select-2';

describe('Select2', () => {
  let component: Select2;
  let fixture: ComponentFixture<Select2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Select2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Select2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
