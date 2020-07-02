import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberDeadComponent } from './number-dead.component';

describe('NumberDeadComponent', () => {
  let component: NumberDeadComponent;
  let fixture: ComponentFixture<NumberDeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberDeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberDeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
