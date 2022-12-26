import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponentComponent } from './categorias-component/categorias-component.component';

const routes: Routes = [
  {path: '', component: CategoriasComponentComponent},
  {path: 'categorias', component: CategoriasComponentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
