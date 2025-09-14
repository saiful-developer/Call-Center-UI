import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rna } from './rna';

describe('Rna', () => {
  let component: Rna;
  let fixture: ComponentFixture<Rna>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rna]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rna);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
