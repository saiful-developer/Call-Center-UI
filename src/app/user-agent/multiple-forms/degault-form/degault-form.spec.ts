import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DegaultForm } from './degault-form';

describe('DegaultForm', () => {
  let component: DegaultForm;
  let fixture: ComponentFixture<DegaultForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DegaultForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DegaultForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
