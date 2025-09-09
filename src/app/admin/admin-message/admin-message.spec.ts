import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMessage } from './admin-message';

describe('AdminMessage', () => {
  let component: AdminMessage;
  let fixture: ComponentFixture<AdminMessage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMessage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMessage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
