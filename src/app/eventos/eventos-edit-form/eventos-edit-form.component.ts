import { EventosServicesService } from 'src/app/shared/services/eventos-services.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, of, switchMap } from 'rxjs';
import { Categorias } from 'src/app/shared/models/Categorias';
import { Eventos } from '../../shared/models/eventos';
import { CategoriasService } from 'src/app/shared/services/categorias.service';
import { catchError, } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import * as moment from 'moment';
import { ArquivoService } from 'src/app/shared/services/arquivo.service';
import { Arquivo } from 'src/app/shared/models/arquivo';
import { environment } from 'src/enviroments/enviroment';

@Component({
  selector: 'app-eventos-edit-form',
  templateUrl: './eventos-edit-form.component.html',
  styleUrls: ['./eventos-edit-form.component.scss']
})
export class EventosEditFormComponent {

  idEvento: number;

  eventoId: number;

  categorias$: Observable<Categorias[]>; //inicializando vazia

  categorias: Categorias[] = [];

  cat: string;

  idImagem : number;

  eventos: Eventos
  // form = this.formBuilder.group(
  //   {
  //     nome: ["", Validators.required],
  //     descricao: ["", Validators.required],
  //     local: ["", Validators.required],
  //     data:["", Validators.required],
  //     detalhes:[""],
  //     categoria: []
  //   });
  form: FormGroup;

    constructor(
      private formBuilder: NonNullableFormBuilder,
      private currentRoute: ActivatedRoute,
      private eventosServices: EventosServicesService,
      private serviceCategorias: CategoriasService,
      private snackBar: MatSnackBar,
      private router: Router,
      private arquivoService: ArquivoService,
      private eventosService: EventosServicesService
      ) {}

    ngOnInit(): void{

      this.form = new FormGroup({
        nome: new FormControl(),
        descricao: new FormControl('', [Validators.required]),
        local: new FormControl('', [Validators.required]),
        data: new FormControl('', [Validators.required]),
        detalhes: new FormControl(''),
        categoria:new FormGroup({
          id: new FormControl('', [Validators.required]),
          nome: new FormControl('', [Validators.required]),
        }),
        imagem: new FormGroup({
          id: new FormControl('', [Validators.required])
        }),

      })

      this.onListCategory()
      this.currentRoute.params.pipe(
        map((params: any) => params['id']),
        switchMap((id: any) => this.eventosServices.getById(id))
      )
        .subscribe(evento => this.updateForm(evento))

      this.eventoId = this.currentRoute.snapshot.params["id"]
      this.onList(this.eventoId);
    }

    onList(id: number) //somente para listar a imagem
    {
      this.eventosService.getById(id).subscribe(res => {
        this.eventos = res;
      })

    }


    updateForm(evento: Eventos) {

      // back-end DD/MM/yyyy HH:mm:ss
      // front-end 9999-12-31T23:59
      const[data, hora ] = evento.data.split(' ')
      console.log(data, hora)

      const[dia, mes, ano ] = data.split('/')

      const[ h , m , s] = hora.split(':')

      console.log(dia, mes, ano, h, m, s)

      evento.data = `${ano}-${mes}-${dia}T${h}:${m}:${s}`;


      //evento.data = `${year}-${month}-${day}T${h}:${m}Z`;
      //eventos.data = moment(eventos.data).format('yyyy-mm-ddTHH:mm');
      //evento.data = new Date(result)
      //console.log(evento.data)


      console.log(evento)
      this.idEvento = evento.id;
      // this.form.patchValue({  //seta o valor do campo [""] => nome
      //   nome: evento.nome,
      //   descricao: evento.descricao,
      //   local: evento.local,
      //   data: evento.data,
      //   detalhes: evento.detalhes,
      //   categoria: evento.categoria
      // })
      // console.log(evento.categoria)

      this.form.patchValue(evento);
   //  this.cat = [`${evento.categoria.nome}`]
     //this.cat = evento.categoria.nome
    }

    onListCategory()
    {
      this.categorias$ = this.serviceCategorias.list()
      .pipe(
        catchError(error => {
          console.log(error);
          //this.onError();
          return of([]) //serve para retornar algo e sair do loading spinner caso de algum erro, o of transforma o array vazio em um observable
        })
      )
    }

    onSubmitEdit()
    {
      const eventos = this.form.value as Eventos;
      eventos.data = moment(eventos.data).format('DD/MM/yyyy HH:mm:ss');

      this.eventosServices.update(this.idEvento, this.form.value)
      .subscribe({
        next: () => {this.onSuccess()},
        error: () => {this.onError()}
      })

    }

    private onSuccess()
    {
      this.snackBar.open("evento editado", "", {duration: 3000})
      this.router.navigate([''], { relativeTo:  this.currentRoute})
    }

    private onError() {
      this.snackBar.open("erro ao editar evento", "", {duration: 3000})
    }


    onFileChanged($event: Event): void {

      const eventos = this.form.value as Eventos;

      this.arquivoService.deleteArquivo(eventos.imagem.id)

      const target = $event.target as HTMLInputElement; /////<=
      const files = target.files as FileList; /////<=
      if (files && files.length) {    ////<=

      const file = files[0];  //<=
      this.arquivoService.uploadArquivo(file).subscribe((arquivo: Arquivo) => {
        this.idImagem = arquivo.id;
        this.form.get('imagem.id').setValue(this.idImagem);
      })

      }
    }

    public createUrl(id : number): string {
      return `${environment.apiUrlBase}/arquivo/${id}`;
    }

}
