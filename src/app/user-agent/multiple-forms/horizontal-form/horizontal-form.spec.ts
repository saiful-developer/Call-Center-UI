import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalForm } from './horizontal-form';

describe('HorizontalForm', () => {
  let component: HorizontalForm;
  let fixture: ComponentFixture<HorizontalForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorizontalForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorizontalForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
