import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarLandingPageComponent } from './registrar-landing-page.component';

describe('RegistrarLandingPageComponent', () => {
  let component: RegistrarLandingPageComponent;
  let fixture: ComponentFixture<RegistrarLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrarLandingPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
