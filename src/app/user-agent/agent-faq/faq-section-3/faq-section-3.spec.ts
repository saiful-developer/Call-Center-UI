import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqSection3 } from './faq-section-3';

describe('FaqSection3', () => {
  let component: FaqSection3;
  let fixture: ComponentFixture<FaqSection3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaqSection3]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaqSection3);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
