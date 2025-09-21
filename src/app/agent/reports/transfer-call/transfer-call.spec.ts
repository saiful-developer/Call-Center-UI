import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferCall } from './transfer-call';

describe('TransferCall', () => {
  let component: TransferCall;
  let fixture: ComponentFixture<TransferCall>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferCall]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferCall);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
