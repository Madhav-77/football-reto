import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroundDashboardComponent } from './ground-dashboard.component';

describe('GroundDashboardComponent', () => {
  let component: GroundDashboardComponent;
  let fixture: ComponentFixture<GroundDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroundDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroundDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
