import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosComponentComponent } from './eventos-component.component';

describe('EventosComponentComponent', () => {
  let component: EventosComponentComponent;
  let fixture: ComponentFixture<EventosComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventosComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventosComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
