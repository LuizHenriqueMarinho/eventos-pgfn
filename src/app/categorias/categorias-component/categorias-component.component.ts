import { CategoriaDialogConfirmationComponent } from '../../components/categoria-dialog-confirmation/categoria-dialog-confirmation.component';
import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common'
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriasService } from 'src/app/shared/services/categorias.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorias } from '../../shared/models/Categorias';
import { catchError, Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-categorias-component',
  templateUrl: './categorias-component.component.html',
  styleUrls: ['./categorias-component.component.scss']
})
export class CategoriasComponentComponent {

  @Output() newList: EventEmitter<any> = new EventEmitter();  //para cominicar entre components

  categorias$: Observable<Categorias[]>;

  displayedColumns = ["nome", "actions"]

  formCategory: FormGroup;

constructor(
  private service: CategoriasService,
  private snackBar: MatSnackBar,
  private location: Location,
  private currentRoute: ActivatedRoute,
  private router: Router,
  private dialogConfirmation: MatDialog) {}


ngOnInit(): void
{
  this.onList();
  this.formCategory = new FormGroup({
    id: new FormControl(),
    nome: new FormControl('', [])
})
}

onSubmit()
  {
    this.service.save(this.formCategory.value)
    .subscribe({
      next: () => {this.onSuccess()},
      error: () => {this.onError()}
    })

    this.newList.emit()
  }

  onCancel()
  {
    this.location.back();
  }

  private onSuccess()
  {
    this.snackBar.open("categoria cadastrada", "", {duration: 3000})
    this.onList()
  }

  private onError()
  {
    this.snackBar.open("erro ao cadastrar categoria", "", {duration: 3000})
  }



  onList()
  {
    this.categorias$ = this.service.list()
     .pipe(
       catchError(error => {
        console.log(error);
         this.onError();
        return of([]) //serve para retornar algo e sair do loading spinner caso de algum erro, o of transforma o array vazio em um observable
      })
    )
  }

  onRemove(id: number)
  {
    const dialogStatus = this.dialogConfirmation.open(CategoriaDialogConfirmationComponent);
    dialogStatus.afterClosed().subscribe(anser =>
      {
        if(anser)
        {
         this.service.remove(id)
          .subscribe({  //o subscribe avisa quando houver mudança no observable e retorna next ou error
          next: () => { this.snackBar.open("categoria removida", "", {duration: 3000}),  this.onList()},
          error: () => {this.snackBar.open("erro ao remover categoria", "", {duration: 3000})}
           })
        }
      })
  }

  onUpdate(id: number)
  {
    this.router.navigate(['editCategories', id], {relativeTo: this.currentRoute})
  }
}
