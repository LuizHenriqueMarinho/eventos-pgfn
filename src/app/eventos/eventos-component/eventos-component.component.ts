import { environment } from './../../../enviroments/enviroment';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EventosServicesService } from 'src/app/shared/services/eventos-services.service';
import { Eventos } from '../../shared/models/eventos';
import { PageParams } from 'src/app/shared/models/page-params';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmationComponent } from 'src/app/components/evento-dialog-confirmation/evento-dialog-confirmation.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoriasService } from 'src/app/shared/services/categorias.service';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ArquivoService } from 'src/app/shared/services/arquivo.service';


@Component({
  selector: 'app-eventos-component',
  templateUrl: './eventos-component.component.html',
  styleUrls: ['./eventos-component.component.scss']
})
export class EventosComponentComponent {

  @Output() eventosComponent: EventEmitter<any> = new EventEmitter();  //para cominicar entre components

  //eventos: Array<Eventos> = [];
  eventos : Eventos[] = []
  evento: Eventos

  url: string = "http://localhost:8080/arquivo/"

  imagem: any;

  page = 1;
  pageSize = 6;
  totalElements: number = 0;

  formGroupPesquisaEvento: FormGroup
  formGroupPesquisaCategoria: FormGroup

  constructor(private eventosService: EventosServicesService,
              private router: Router,
              private currentRoute: ActivatedRoute,  //rota em que o usuário estver
              private snackBar: MatSnackBar,
              private dialogConfirmation: MatDialog,
              private formBuilder: FormBuilder,
              private categoriasService: CategoriasService,
              private arquivoService: ArquivoService
              ) {}


  ngOnInit(): void {

    this.formGroupPesquisaEvento = this.formBuilder.group({
      nome: ""
    });

    this.formGroupPesquisaCategoria = this.formBuilder.group({
      nome: ""
    });

    this.onListPage()

  }

  onListPage()
  {
    let page: PageParams = { page: this.page - 1, linesPerPage: this.pageSize, oerderBy: 'updatedAt', direction: 'DESC'};
    this.eventosService.listPage(page).subscribe(res => {
      this.eventos = res.content
      this.totalElements = res.totalElements
      console.log(this.eventos)
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
            next: () => { this.snackBar.open("evento removido", "", { duration: 3000 }), this.onListPage(), this.router.navigate([''], { relativeTo: this.currentRoute }) },
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
    //this.onSearchCategory();
  }

  limparPesquisaEvento() {
    this.formGroupPesquisaEvento.reset();
    this.onListPage();
    console.log("limpar")
  }


  // onSearchCategory() {
  //   console.log(this.formGroupPesquisaEvento.value.nome)
  //   this.categoriasService.filter(`${this.formGroupPesquisaEvento.value.nome}`).subscribe(res => {
  //      console.log(res[0].nome)
  //     // this.eventos.filter((evento) => {
  //     //   return evento.categoria === res.content
  //     // })
  //     // console.log(this.eventos)
  //     for(let i = 0; i < this.eventos.length; i++)
  //     {
  //       for(let j = 0; j < res.length; j++)
  //       {
  //         if(this.eventos[i].categoria.nome === res[j].nome)
  //         {
  //            this.eventos = [...this.eventos, res[i]]
  //         }
  //       }
  //     }
  //   })
  //  }

  nextPage(event: PageEvent) {
    console.log(event)
    let page: PageParams = { page: event.pageIndex, linesPerPage: event.pageSize, oerderBy: 'createdAt', direction: 'DESC'};
    this.eventosService.listPage(page).subscribe(res => {
      this.totalElements =  res.totalElements
      this.eventos = res.content;
    })
  }


  ///////arquivo
  // getFiles(evento : Eventos){
  //   this.imagem = this.createUrl(evento.imagem.id);
  //   console.log(this.imagem)

  // }

   //cria url
   public createUrl(id : number): string {
    return `${environment.apiUrlBase}/arquivo/${id}`;
  }


}
