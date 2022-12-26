import { CategoriasComponentComponent } from 'src/app/categorias/categorias-component/categorias-component.component';
import { ExibirEventoComponent } from './exibir-evento/exibir-evento.component';
import { EventosComponentComponent } from './eventos-component/eventos-component.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventosFormComponent } from './eventos-form/eventos-form.component';
import { EventosEditFormComponent } from './eventos-edit-form/eventos-edit-form.component';

const routes: Routes = [
  {path: '', component: EventosComponentComponent},
  {path: 'add', component: EventosFormComponent},
  {path: 'edit/:id', component: EventosEditFormComponent},
  {path: 'exibir/:id', component: ExibirEventoComponent},
  //{path: 'editCategories'
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventosComponentRoutingModule { }
