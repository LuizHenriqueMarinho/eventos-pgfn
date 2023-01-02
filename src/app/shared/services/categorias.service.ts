import { environment } from './../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { Categorias } from '../models/Categorias';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private readonly linkAPI = environment.apiUrlBase + '/categorias';

  constructor(private httpClient: HttpClient) { }

  list()
  {
    return this.httpClient.get<Categorias[]>(this.linkAPI) //isso é um tipo Observable, versão melhorada do primisses
    .pipe(   //permite manipular com rxjs
      first()
    );
  }


  save(record: Partial<Categorias>) //aceita que o objeto esteja faltando atributos
  {
    return this.httpClient.post<Categorias>(`${this.linkAPI}/save`, record);
  }

  update(id: number, record: Partial<Categorias>)
  {
    return this.httpClient.put<Categorias>(`${this.linkAPI}/update/${id}`, record)
  }


  remove(id: number)
  {
    return this.httpClient.delete<Categorias>(`${this.linkAPI}/delete/${id}`)
  }

  getById(id: number)
  {
    return this.httpClient.get<Categorias>(`${this.linkAPI}/${id}`)
  }

  filter(nome : String): Observable<any> {
    return this.httpClient.get(`${this.linkAPI}/busca?nome=${nome}`);
  }
}
