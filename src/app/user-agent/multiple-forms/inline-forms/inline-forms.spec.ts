import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineForms } from './inline-forms';

describe('InlineForms', () => {
  let component: InlineForms;
  let fixture: ComponentFixture<InlineForms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InlineForms]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InlineForms);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
