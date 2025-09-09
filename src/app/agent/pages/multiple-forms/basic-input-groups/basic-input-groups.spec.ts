import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicInputGroups } from './basic-input-groups';

describe('BasicInputGroups', () => {
  let component: BasicInputGroups;
  let fixture: ComponentFixture<BasicInputGroups>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicInputGroups]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicInputGroups);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
