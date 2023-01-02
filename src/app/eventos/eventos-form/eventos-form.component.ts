import { EventosServicesService } from '../../shared/services/eventos-services.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar} from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { Categorias } from 'src/app/shared/models/Categorias';
import { Observable, of } from 'rxjs';
import { CategoriasService } from 'src/app/shared/services/categorias.service';
import { catchError, } from 'rxjs/operators';
import { Eventos } from '../../shared/models/eventos';
import * as moment from 'moment';
import { ArquivoService } from 'src/app/shared/services/arquivo.service';
import { Arquivo } from 'src/app/shared/models/arquivo';

@Component({
  selector: 'app-eventos-form',
  templateUrl: './eventos-form.component.html',
  styleUrls: ['./eventos-form.component.scss']
})
export class EventosFormComponent {

  categorias$: Observable<Categorias[]>;

  form: FormGroup;

  idImagem : number;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private EventosService: EventosServicesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private categoriasService: CategoriasService,
    //private form: FormGroup
    private arquivoService: ArquivoService
  ) {}

  ngOnInit(): void
  {
    this.listarCategorias()
    this.form = this.formBuilder.group(
      {
        nome: ["", Validators.required],
        descricao: ["", Validators.required],
        local: ["", Validators.required],
        data:["", Validators.required],
        detalhes:[""],
        categoria:  new FormControl('', Validators.required),
        imagem: new FormGroup({
          id: new FormControl('', [Validators.required])
        }),
      }
    )
  }

  onSubmit()
  {
    const eventos = this.form.value as Eventos;
    eventos.data = moment(eventos.data).format('DD/MM/yyyy HH:mm:ss');


    this.EventosService.save(eventos)
    .subscribe({
      next: () => {this.onSuccess()},
      error: () => {this.onError()}
    })
  }

  onCancel()
  {
    this.location.back();
  }

  private onSuccess()
  {
    this.snackBar.open("evento cadastrado", "", {duration: 3000})
    this.onCancel(); // para voltar para pagina inicial
  }

  private onError()
  {
    this.snackBar.open("erro ao cadastrar evento", "", {duration: 3000})
  }

  listarCategorias()
  {
    this.categorias$ = this.categoriasService.list()
     .pipe(
       catchError(error => {
        console.log(error);
         //this.onError();
        return of([]) //serve para retornar algo e sair do loading spinner caso de algum erro, o of transforma o array vazio em um observable
      })
    )
  }

  ////////////////////////////arquivo

  onFileChanged($event: Event): void {

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

}
