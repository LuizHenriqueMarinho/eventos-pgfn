import { DialogConfirmationComponent } from '../components/evento-dialog-confirmation/evento-dialog-confirmation.component';
import { EventosFormComponent } from './eventos-form/eventos-form.component';
import { EventosComponentComponent } from './eventos-component/eventos-component.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventosComponentRoutingModule } from './eventos-component-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EventosEditFormComponent } from './eventos-edit-form/eventos-edit-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ExibirEventoComponent } from './exibir-evento/exibir-evento.component';
import { MatTableModule } from '@angular/material/table'

@NgModule({
  declarations: [
    EventosComponentComponent,
    EventosFormComponent,
    EventosEditFormComponent,
    DialogConfirmationComponent,
    ExibirEventoComponent
  ],
  imports: [
    CommonModule,
    EventosComponentRoutingModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTableModule
  ]
})
export class EventosComponentModule { }
