import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosEditFormComponent } from './eventos-edit-form.component';

describe('EventosEditFormComponent', () => {
  let component: EventosEditFormComponent;
  let fixture: ComponentFixture<EventosEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventosEditFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventosEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
