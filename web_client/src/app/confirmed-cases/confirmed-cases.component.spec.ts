import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmedCasesComponent } from './confirmed-cases.component';

describe('ConfirmedCasesComponent', () => {
  let component: ConfirmedCasesComponent;
  let fixture: ComponentFixture<ConfirmedCasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmedCasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmedCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
