import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgeLandingPageComponent } from './judge-landing-page.component';

describe('JudgeLandingPageComponent', () => {
  let component: JudgeLandingPageComponent;
  let fixture: ComponentFixture<JudgeLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JudgeLandingPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JudgeLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
