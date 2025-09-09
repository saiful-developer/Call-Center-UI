import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortSicebar } from './short-sicebar';

describe('ShortSicebar', () => {
  let component: ShortSicebar;
  let fixture: ComponentFixture<ShortSicebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShortSicebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShortSicebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
