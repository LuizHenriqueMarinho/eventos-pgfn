import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasComponentComponent } from './categorias-component.component';

describe('CategoriasComponentComponent', () => {
  let component: CategoriasComponentComponent;
  let fixture: ComponentFixture<CategoriasComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriasComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriasComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
