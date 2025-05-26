import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleCaseComponent } from './schedule-case.component';

describe('ScheduleCaseComponent', () => {
  let component: ScheduleCaseComponent;
  let fixture: ComponentFixture<ScheduleCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScheduleCaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
