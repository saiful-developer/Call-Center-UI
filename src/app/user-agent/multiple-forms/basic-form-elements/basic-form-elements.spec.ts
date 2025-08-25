import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicFormElements } from './basic-form-elements';

describe('BasicFormElements', () => {
  let component: BasicFormElements;
  let fixture: ComponentFixture<BasicFormElements>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicFormElements]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicFormElements);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
