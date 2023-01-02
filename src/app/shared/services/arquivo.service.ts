import { environment } from './../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Arquivo } from '../models/arquivo';

@Injectable({
  providedIn: 'root'
})
export class ArquivoService {

  private readonly linkAPI = environment.apiUrlBase + '/arquivo';

  constructor(private httpClient: HttpClient) { }

  uploadArquivo(arquivo: File): Observable<Arquivo> {
      const uploadData = new FormData();  // está relacionado com a forma que a reuisição é feita no postman FormData()
      uploadData.append('imagefile', arquivo, arquivo.name);
      return this.httpClient.post<Arquivo>(`${this.linkAPI}`, uploadData);
  }

  deleteArquivo(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.linkAPI}/${id}`);
  }

}



