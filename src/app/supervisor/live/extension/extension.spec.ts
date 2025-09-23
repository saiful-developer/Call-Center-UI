import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Extension } from './extension';

describe('Extension', () => {
  let component: Extension;
  let fixture: ComponentFixture<Extension>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Extension]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Extension);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
