import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import 'moment/locale/pt-br'
import { EventosServicesService } from 'src/app/shared/services/eventos-services.service';
import { Eventos } from '../../shared/models/eventos';
import { DialogConfirmationComponent } from 'src/app/components/evento-dialog-confirmation/evento-dialog-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/enviroments/enviroment';

@Component({
  selector: 'app-exibir-evento',
  templateUrl: './exibir-evento.component.html',
  styleUrls: ['./exibir-evento.component.scss']
})
export class ExibirEventoComponent {

  eventoId: number;
  eventos: Eventos


  constructor(private eventosService: EventosServicesService,
    private router: Router,
    private route: ActivatedRoute,
    private currentRoute: ActivatedRoute,  //rota em que o usuário estver
    private snackBar: MatSnackBar,
    private dialogConfirmation: MatDialog
    //private snackBar: MatSnackBar,
    ) {}


ngOnInit(): void {
  this.eventoId = this.route.snapshot.params["id"]
  this.onList(this.eventoId);
}

  onList(id: number)
  {
    this.eventosService.getById(id).subscribe(res => {
      this.eventos = res;
      console.log(this.eventos)

      this.eventos.data = this.formatDate(this.eventos.data);
      this.eventos.createdAt = this.formatDate(this.eventos.createdAt)
      this.eventos.updatedAt = this.formatDate(this.eventos.updatedAt)

      this.eventos.data = moment(this.eventos.data).format('llll');
      this.eventos.createdAt = moment(this.eventos.createdAt).format('llll');
      this.eventos.updatedAt = moment(this.eventos.updatedAt).format('llll');
     })

  }

  onCancel()
  {
    this.router.navigate([''], { relativeTo:  this.currentRoute})
  }

  onUpdate(id: number)
  {
    this.router.navigate(['eventos/edit', id ])
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
            next: () => { this.snackBar.open("evento removido", "", { duration: 3000 }), this.onCancel() },
            error: () => { this.snackBar.open("erro ao remover evento", "", { duration: 3000 }) }
          })
        }
      })
  }

  formatDate(dateToFormat: string)
  {
    const[data, hora ] = dateToFormat.split(' ')
    const[dia, mes, ano ] = data.split('/')
    const[ h , m , s] = hora.split(':')
    dateToFormat = `${ano}-${mes}-${dia}T${h}:${m}:${s}`;
    return dateToFormat;
  }

  public createUrl(id : number): string {
    return `${environment.apiUrlBase}/arquivo/${id}`;
  }


}
