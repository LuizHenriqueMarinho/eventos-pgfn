import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaDialogConfirmationComponent } from './categoria-dialog-confirmation.component';

describe('CategoriaDialogConfirmationComponent', () => {
  let component: CategoriaDialogConfirmationComponent;
  let fixture: ComponentFixture<CategoriaDialogConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriaDialogConfirmationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriaDialogConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
