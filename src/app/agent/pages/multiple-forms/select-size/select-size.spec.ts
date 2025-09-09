import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSize } from './select-size';

describe('SelectSize', () => {
  let component: SelectSize;
  let fixture: ComponentFixture<SelectSize>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectSize]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectSize);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
