import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutineManagerComponent } from './routine-manager.component';

describe('RoutineManagerComponent', () => {
  let component: RoutineManagerComponent;
  let fixture: ComponentFixture<RoutineManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoutineManagerComponent]
    });
    fixture = TestBed.createComponent(RoutineManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
