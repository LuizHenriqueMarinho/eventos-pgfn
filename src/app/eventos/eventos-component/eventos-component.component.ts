import { Component, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EventosServicesService } from 'src/app/shared/services/eventos-services.service';
import { Eventos } from '../../shared/models/eventos';
import { PageParams } from 'src/app/shared/models/page-params';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmationComponent } from 'src/app/components/evento-dialog-confirmation/evento-dialog-confirmation.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-eventos-component',
  templateUrl: './eventos-component.component.html',
  styleUrls: ['./eventos-component.component.scss']
})
export class EventosComponentComponent {

  @Output() eventosComponent: EventEmitter<any> = new EventEmitter();  //para cominicar entre components

  eventos: Array<Eventos> = [];
  page = 1;
  pageSize = 10;
  totalPages: any;

  formGroupPesquisaEvento: FormGroup

  constructor(private eventosService: EventosServicesService,
              private router: Router,
              private currentRoute: ActivatedRoute,  //rota em que o usuário estver
              private snackBar: MatSnackBar,
              private dialogConfirmation: MatDialog,
              private formBuilder: FormBuilder,
              ) {}


  ngOnInit(): void {

    this.formGroupPesquisaEvento = this.formBuilder.group({
      nome: ""
    });

    this.onListPage();

  }

  onListPage()
  {
    let page: PageParams = { page: this.page - 1, linesPerPage: this.pageSize, oerderBy: 'updatedAt', direction: 'ASC'};
    this.eventosService.listPage(page).subscribe(res => {
      this.eventos = res.content
      this.totalPages = res.totalPages
    })
  }

  onAdd()
  {
    this.router.navigate(['add'], { relativeTo:  this.currentRoute})
  }

  onUpdate(id: number)
  {
    this.router.navigate(['edit', id], { relativeTo: this.currentRoute })
  }

  onRemove(id: number)
  {
    const dialogStatus = this.dialogConfirmation.open(DialogConfirmationComponent);
    dialogStatus.afterClosed().subscribe(anser =>
      {
        if(anser)
        {
        this.eventosService.remove(id)
          .subscribe({  //o subscribe avisa quando houver mudança no observable e retorna next ou error
            next: () => { this.snackBar.open("evento removido", "", { duration: 3000 }), this.onListPage() },
            error: () => { this.snackBar.open("erro ao remover evento", "", { duration: 3000 }) }
          })
        }
      })
  }

  onClick(id: number)
  {
    this.router.navigate(['exibir', id], { relativeTo: this.currentRoute })
  }

  onAddCategory()
  {
    this.router.navigate(['categorias'], { relativeTo: this.currentRoute })
  }


  onSearchEvento() {
    console.log(this.formGroupPesquisaEvento.value.nome)
    this.eventosService.filter(`${this.formGroupPesquisaEvento.value.nome}`).subscribe(res => {
    this.eventos = res;
    })
  }

  limparPesquisaEvento() {
    this.formGroupPesquisaEvento.reset();
    this.onListPage();
    console.log("limpar")
  }
}
