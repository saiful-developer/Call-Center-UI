import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqSection2 } from './faq-section-2';

describe('FaqSection2', () => {
  let component: FaqSection2;
  let fixture: ComponentFixture<FaqSection2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaqSection2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaqSection2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
