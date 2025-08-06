import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqSection1 } from './faq-section-1';

describe('FaqSection1', () => {
  let component: FaqSection1;
  let fixture: ComponentFixture<FaqSection1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaqSection1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaqSection1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
