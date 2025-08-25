import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalTwoColumn } from './horizontal-two-column';

describe('HorizontalTwoColumn', () => {
  let component: HorizontalTwoColumn;
  let fixture: ComponentFixture<HorizontalTwoColumn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorizontalTwoColumn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorizontalTwoColumn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
