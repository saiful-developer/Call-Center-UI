import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleForms } from './multiple-forms';

describe('MultipleForms', () => {
  let component: MultipleForms;
  let fixture: ComponentFixture<MultipleForms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultipleForms]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleForms);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
