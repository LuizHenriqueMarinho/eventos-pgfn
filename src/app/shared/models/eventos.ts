import { Categorias } from "src/app/shared/models/Categorias";
import { Arquivo } from "./arquivo";

export interface Eventos {
  id: number;
  nome: string;
  descricao: string;
  local: string;
  data: string;
  detalhes: string;
  categoria: Categorias;
  imagem: Arquivo;
  createdAt: string;
  updatedAt: string;
};
