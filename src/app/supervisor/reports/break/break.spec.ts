import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Break } from './break';

describe('Break', () => {
  let component: Break;
  let fixture: ComponentFixture<Break>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Break]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Break);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
