import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchPaymentComponent } from './match-payment.component';

describe('MatchPaymentComponent', () => {
  let component: MatchPaymentComponent;
  let fixture: ComponentFixture<MatchPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
