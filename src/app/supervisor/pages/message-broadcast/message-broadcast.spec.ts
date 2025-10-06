import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageBroadcast } from './message-broadcast';

describe('MessageBroadcast', () => {
  let component: MessageBroadcast;
  let fixture: ComponentFixture<MessageBroadcast>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageBroadcast]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageBroadcast);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
