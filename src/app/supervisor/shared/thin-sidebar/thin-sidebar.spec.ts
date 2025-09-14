import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThinSidebar } from './thin-sidebar';

describe('ThinSidebar', () => {
  let component: ThinSidebar;
  let fixture: ComponentFixture<ThinSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThinSidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThinSidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
