import { CategoriaDialogConfirmationComponent } from '../../components/categoria-dialog-confirmation/categoria-dialog-confirmation.component';
import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common'
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriasService } from 'src/app/shared/services/categorias.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorias } from '../../shared/models/Categorias';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-categorias-component',
  templateUrl: './categorias-component.component.html',
  styleUrls: ['./categorias-component.component.scss']
})
export class CategoriasComponentComponent {

  @Output() newList: EventEmitter<any> = new EventEmitter();  //para cominicar entre components

  categorias$: Observable<Categorias[]>;

  cat: any;

  displayedColumns = ["nome", "actions"]

  formCategoria: FormGroup;

  closeResult = '';

  idCategoria: number;


constructor(
  private formBuilder: NonNullableFormBuilder,
  private service: CategoriasService,
  private snackBar: MatSnackBar,
  private location: Location,
  private currentRoute: ActivatedRoute,
  private router: Router,
  private dialogConfirmation: MatDialog,
  private modalService: NgbModal) {}


ngOnInit(): void
{
  this.onList();
  this.formCategoria = new FormGroup({
    id: new FormControl(),
    nome: new FormControl('', [])

})


// this.currentRoute.params.pipe(
//   map((params: any) => params['id']),
//   switchMap((id: any) => this.service.getById(id))
// )
//   .subscribe(categoria => this.updateForm(categoria))
}

open(content: any, id: number) {
  this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
    (result) => {
      this.closeResult = `Closed with: ${result}`;
    },
    (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    },
  );

  this.idCategoria = id
 // this.cat = this.service.getById(id)
  this.service.getById(id).subscribe(categoria => this.updateForm(categoria))

  //console.log(this.cat)
  //this.updateForm(this.cat)
}

private getDismissReason(reason: any): string {
  this.formCategoria.reset()
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}


onSubmit()
  {
    this.service.save(this.formCategoria.value)
    .subscribe({
      next: () => {this.onSuccess()},
      error: () => {this.onError()}
    })

    this.newList.emit()

    this.formCategoria.reset()
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

  private onSuccessEdit()
  {
    this.snackBar.open("categoria editada", "", {duration: 3000})
    this.onList()
  }



  private onError()
  {
    this.snackBar.open("erro ao cadastrar categoria", "", {duration: 3000})
  }

  private onErrorEdit()
  {
    this.snackBar.open("erro ao editar categoria", "", {duration: 3000})
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

  // onUpdate(id: number)
  // {
  //   this.router.navigate(['editarCategorias', id], {relativeTo: this.currentRoute})
  // }

  updateForm(categoria: Categorias) {
    console.log(categoria)
    this.idCategoria = categoria.id;
    this.formCategoria.patchValue({  //seta o valor do campo [""] => nome
      nome: categoria.nome,
    })
  }


  onSubmitEdit()
  {
    this.service.update(this.idCategoria, this.formCategoria.value)
    .subscribe({
      next: () => {this.onSuccessEdit()},
      error: () => {this.onErrorEdit()}
    })
    this.formCategoria.reset()
    //this.onCancel()
  }

}
