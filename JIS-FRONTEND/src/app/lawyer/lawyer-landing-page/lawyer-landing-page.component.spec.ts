import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawyerLandingPageComponent } from './lawyer-landing-page.component';

describe('LawyerLandingPageComponent', () => {
  let component: LawyerLandingPageComponent;
  let fixture: ComponentFixture<LawyerLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LawyerLandingPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LawyerLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
