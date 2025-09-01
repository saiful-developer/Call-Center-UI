import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RNARepots } from './rna-repots';

describe('RNARepots', () => {
  let component: RNARepots;
  let fixture: ComponentFixture<RNARepots>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RNARepots]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RNARepots);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
