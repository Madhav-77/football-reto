import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchScoringComponent } from './match-scoring.component';

describe('MatchScoringComponent', () => {
  let component: MatchScoringComponent;
  let fixture: ComponentFixture<MatchScoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchScoringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchScoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
