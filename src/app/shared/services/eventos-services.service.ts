import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';
import { Eventos } from '../models/eventos';
import { Page } from '../models/page';
import { PageParams } from '../models/page-params';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class EventosServicesService {

  private readonly LinkAPI = environment.apiUrlBase + '/eventos-pgfn';

  constructor(private httpClient: HttpClient) { }

  listPage(pageParams: PageParams) : Observable<Page<Eventos>>
  {
    let params = UtilService.pageParamsHttpParams(pageParams);
    return this.httpClient.get<Page<Eventos>>(this.LinkAPI, {params: params})
  }

  getById(id: number)
  {
    return this.httpClient.get<Eventos>(`${this.LinkAPI}/${id}`)
  }

  save(record: Partial<Eventos>)
  {
    return this.httpClient.post<Eventos>(`${this.LinkAPI}/save`, record)
  }

  update(id: number, record: Partial<Eventos>)
  {
    return this.httpClient.put<Eventos>(`${this.LinkAPI}/${id}`, record)
  }

  remove(id: number)
  {
    return this.httpClient.delete<Eventos>(`${this.LinkAPI}/${id}`)
  }

  filter(evento : string): Observable<Eventos[]> {
    return this.httpClient.get<Eventos[]>(`${this.LinkAPI}/busca?nome=${evento}`);
  }

}
