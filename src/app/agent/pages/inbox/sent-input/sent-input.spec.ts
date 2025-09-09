import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentInput } from './sent-input';

describe('SentInput', () => {
  let component: SentInput;
  let fixture: ComponentFixture<SentInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SentInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SentInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
