import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboControls } from './checkbo-controls';

describe('CheckboControls', () => {
  let component: CheckboControls;
  let fixture: ComponentFixture<CheckboControls>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboControls]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckboControls);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
